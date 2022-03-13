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
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '~/core/auth/auth.decorator';
import { AuthGuard } from '~/core/auth/auth.guard';
import { Role } from '~/core/auth/role.enum';
import { Roles } from '~/core/auth/roles.decorator';
import { RolesGuard } from '~/core/auth/roles.guard';
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

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  getMe(@Req() req) {
    const user: any = req.user;

    if (!user || !user.storedUser) {
      throw new UnauthorizedException();
    }

    return this.userService.findOne(user.storedUser.id);

    // return user;
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
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
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  // setTenant(@GetUser() user: User, @Body() body: UpdateUserTenantDTO) {
  //   if (user.role == Role.TENANT_ADMIN && user.tenant.id != body.tenantId)
  //     throw new UnauthorizedException();

  //   return this.userService.setUserTenant(body);
  // }

  @Patch('role')
  @UseGuards(AuthGuard, RolesGuard)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/me')
  @UseGuards(AuthGuard)
  removeMe(@GetUser() user: User) {
    return this.userService.remove(user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
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

  @Get('data/me')
  @UseGuards(AuthGuard)
  async getOwnUserData() {
    // TODO: implement
    throw new NotImplementedException();
  }

  @Get('data/:id')
  @UseGuards(AuthGuard, RolesGuard)
  async getSpecificUserData(@Query('id') id: string) {
    // TODO: implement
    throw new NotImplementedException();
  }
}
