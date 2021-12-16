import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
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

  async createUser(createUserDTO: CreateUserDTO) {
    if (await this.userRepository.findOne({ email: createUserDTO.email }))
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);

    const confirmationToken =
      Math.floor(Math.random() * (99999 - 10000) + 10000) + '-' + Date.now();

    const nUser: Partial<User> = {
      ...createUserDTO,
      lastLogin: new Date(),
      confirmationToken: confirmationToken,
      role: createUserDTO.role,
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
      await this.mailService.sendConfirmUser(user).catch(() => {
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

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({
      email: email,
    });
  }

  findOneById(id: string): Promise<User> {
    console.log(`FIND ONE ${id}`);
    return this.userRepository.findOne({
      id,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  setUserRole(id: string, desiredRole: Role) {
    return this.userRepository.update(id, {
      role: desiredRole,
    });
  }

  resetPassword(user) {
    this.mailService.sendResetPasswordMail(user);
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
    console.log(refreshToken, userId);
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
}
