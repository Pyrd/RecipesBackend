import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { MailService } from 'src/core/mail/mail.service';
import { Repository } from 'typeorm';
import { Role } from '~/core/authentication/role.enum';
import PostgresErrorCode from '~/core/database/postgresErrorCode.enum';
import { ConfirmUserDTO } from './dto/confirm-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  // async create(createUserDto: CreateUserDto) {
  //     let { password, ...user } = createUserDto;

  //     let hashed = await bcrypt.hash(password, 14);

  //     let tenant: Tenant = await this.tenantService.findOne(createUserDto.tenantId)

  //     if (!tenant) {
  //         throw new HttpException("Tenant not found", HttpStatus.NOT_FOUND)
  //     }

  //     let nUser: Partial<User> = {
  //         ...user,
  //         passwordHash: hashed,
  //         tenant: tenant,
  //         lastLogin: new Date()
  //     };

  //     return this.userRepository.save(nUser);
  // }

  getUserInfos(token: string) {
    return this.userRepository
      .findOne({
        confirmationToken: token,
      })
      .then((retrieved) => {
        if (!retrieved)
          throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

        return retrieved;
      });
  }

  makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
  }

  private getRandomToken() {
    return (
      Math.floor(Math.random() * (99999 - 10000) + 10000) + '-' + Date.now()
    );
  }

  async createUser(createUserDTO: CreateUserDTO) {
    if (await this.userRepository.findOne({ email: createUserDTO.email }))
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);

    const confirmationToken = this.getRandomToken();

    const nUser: Partial<User> = {
      ...createUserDTO,
      lastLogin: new Date(),
      confirmationToken: confirmationToken,
      role: createUserDTO.role,
      id: this.makeid(6),
    };

    const need_confirmation = this.configService.get('user_confirmation');
    if (!need_confirmation) {
      nUser.confirmed = need_confirmation;
      nUser.passwordHash = await bcrypt.hash(createUserDTO.password, 14);
      nUser.confirmed = true;
      nUser.confirmationToken = null;
    }

    const user = await this.userRepository.save(nUser).catch((error) => {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with that email already exists');
      }
      throw new HttpException(
        'Failed to save user !',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    if (need_confirmation) {
      await this.mailService.sendUserConfirmation(user).catch(() => {
        throw new HttpException(
          'Failed to send confirmation email !',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    }

    return {
      ...nUser,
      confirmationToken,
    };
  }

  async confirmUserEmail(token: string) {
    const user: User = await this.userRepository.findOne({
      confirmationToken: token,
    });

    if (!user) {
      throw new HttpException(
        'Invalid verification token',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.confirmed = true;
    user.confirmationToken = null;
    this.userRepository.update(user.id, user);
  }

  async confirmUser(confirmUserDTO: ConfirmUserDTO) {
    const user: User = await this.userRepository.findOne({
      confirmationToken: confirmUserDTO.token,
    });

    if (!user) {
      throw new HttpException(
        'Invalid verification token',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.passwordHash = await bcrypt.hash(confirmUserDTO.password, 14);
    user.confirmed = true;
    user.confirmationToken = null;

    this.userRepository.update(user.id, user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    for (const u of users) {
      u.passwordHash = undefined;
      u.confirmationToken = undefined;
      u.currentHashedRefreshToken = undefined;
    }

    return users;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      email: email,
    });
    if (user == undefined) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      // passwordHash: undefined,TODO: Breaking change: used in jwt guard. To fix !
      confirmationToken: undefined,
      currentHashedRefreshToken: undefined,
    };
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      passwordHash: undefined,
      confirmationToken: undefined,
      currentHashedRefreshToken: undefined,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    if (updateUserDto.email && updateUserDto.email != user.email) {
      updateUserDto.confirmed = false;
    }

    const nUser: User = {
      ...this.userRepository.create({ ...user, ...updateUserDto }),
    };
    await this.userRepository.save(nUser);
    if (updateUserDto.email) {
      await this.sendConfirmationEmail(user);
    }

    return;
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  setUserRole(id: string, desiredRole: Role) {
    return this.userRepository.update(id, {
      role: desiredRole,
    });
  }

  async generateNewToken(user: User) {
    const confirmationToken = this.getRandomToken();

    user.confirmationToken = confirmationToken;
    await this.update(user.id, {
      confirmationToken: confirmationToken,
    });
    return user;
  }

  async resetPassword(email: string) {
    let user = await this.findOne(email).catch((err) => {
      this.logger.warn(
        `[resetPassword] failed to fetch user, email '${email}' !`,
      );
    });
    if (!user) {
      return;
    } else if (!user.confirmed) {
      throw new BadRequestException('ERROR.USER_NOT_CONFIRMED');
    }

    user = await this.generateNewToken(user);
    await this.mailService.sendResetPasswordMail(user);
    return user;
  }

  async resendConfirmationEmail(email: string) {
    const user = await this.findOne(email);
    return this.sendConfirmationEmail(user);
  }

  async sendConfirmationEmail(user: User) {
    user = await this.generateNewToken(user);
    await this.mailService.sendUserConfirmation(user, false);
    return user;
  }

  async disableUser(id: string) {
    return this.userRepository.update(id, {
      disable: true,
    });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.findOneById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async test() {
    const resp = await this.findAll();
    console.log(resp[0]);
    this.mailService.sendUserConfirmation(resp[0]);
  }
}
