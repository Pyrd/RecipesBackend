import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/core/auth/auth.decorator';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { Role } from 'src/core/auth/role.enum';
import { Roles } from 'src/core/auth/roles.decorator';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { ConfirmUserDTO } from './dto/confirm-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserRoleDTO } from './dto/update-user-role.dto';
import { UpdateUserTenantDTO } from './dto/update-user-tenant.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @UseGuards(JwtAuthGuard)
  getMe(@GetUser() user: User) {
    return user;
  }

  // @Patch("tenant")
  // setTenant() {
  //     //TODO: Implement function
  //     throw new NotImplementedException();
  // }

  // @Patch(':id/tenant')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  // setTenant(@GetUser() user: User, @Body() body: UpdateUserTenantDTO) {
  //   if (user.role == Role.TENANT_ADMIN && user.tenant.id != body.tenantId)
  //     throw new UnauthorizedException();

  //   return this.userService.setUserTenant(body);
  // }

  @Patch('role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  setUserRole(@Body() body: UpdateUserRoleDTO) {
    return this.userService.setUserRole(body.userId, body.role);
  }

  @Patch('disable/:id')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  disableUser(@Param('id') id: string) {
    this.userService.disableUser(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/me')
  @UseGuards(JwtAuthGuard)
  removeMe(@GetUser() user: User) {
    return this.userService.remove(user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // Reset Password
  @Get('resetpassword')
  @UseGuards(JwtAuthGuard)
  resetPassword(@GetUser() user: User) {
    return this.userService.resetPassword(user);
  }
}
