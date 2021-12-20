import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '~/core/authentication/auth.decorator';
import JwtAuthenticationGuard from '~/core/authentication/jwt-authentication.guard';
import { Role } from '~/core/authentication/role.enum';
import { Roles } from '~/core/authentication/roles.decorator';
import { RolesGuard } from '~/core/authentication/roles.guard';
import { ConfirmUserDTO } from './dto/confirm-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserRoleDTO } from './dto/update-user-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@GetUser() user: User, @Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Get('/confirmed/:token')
  getUserInfos(@Param('token') token: string) {
    return this.userService.getUserInfos(token);
  }

  @Post('/confirm')
  confirmUser(@Body() confirmUserDTO: ConfirmUserDTO) {
    return this.userService.confirmUser(confirmUserDTO);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll().then((usrs) => {
      return usrs.map((usr) => {
        const { passwordHash, ...user } = usr;
        return user;
      });
    });
  }

  @Get('/me')
  @UseGuards(JwtAuthenticationGuard)
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  // @Patch("tenant")
  // setTenant() {
  //     //TODO: Implement function
  //     throw new NotImplementedException();
  // }

  // @Patch(':id/tenant')
  // @UseGuards(JwtAuthenticationGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  // setTenant(@GetUser() user: User, @Body() body: UpdateUserTenantDTO) {
  //   if (user.role == Role.TENANT_ADMIN && user.tenant.id != body.tenantId)
  //     throw new UnauthorizedException();

  //   return this.userService.setUserTenant(body);
  // }

  @Patch('role')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.ADMIN)
  setUserRole(@Body() body: UpdateUserRoleDTO) {
    return this.userService.setUserRole(body.userId, body.role);
  }

  @Patch('disable/:id')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  disableUser(@Param('id') id: string) {
    this.userService.disableUser(id);
  }

  @Patch('undisable/:id')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  unDisableUser(@Param('id') id: string) {
    this.userService.unDisableUser(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/me')
  @UseGuards(JwtAuthenticationGuard)
  removeMe(@GetUser() user: User) {
    return this.userService.remove(user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // Reset Password
  @Post('resetpassword')
  resetPassword(@Body('email') email: string) {
    return this.userService.resetPassword(email);
  }

  @Post('sendconfirmationemail')
  resendEmailConfirmation(@Body('email') email: string) {
    return this.userService.resendConfirmationEmail(email);
  }

  @Post('confirm-email')
  reconfirmEmail(@Body('token') email: string) {
    return this.userService.confirmUserEmail(email);
  }

  @Get('data/me')
  @UseGuards(JwtAuthenticationGuard)
  async getOwnUserData() {
    // TODO: implement
    throw new NotImplementedException();
  }

  @Get('data/:id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  async getSpecificUserData(@Query('id') id: string) {
    // TODO: implement
    throw new NotImplementedException();
  }
}
