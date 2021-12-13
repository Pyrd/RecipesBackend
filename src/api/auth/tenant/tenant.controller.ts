// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   UseGuards,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { AssignedTenant } from 'src/core/auth/assigned-tenant.guard';
// import { GetUser } from 'src/core/auth/auth.decorator';
// import { JwtAuthenticationGuard } from 'src/core/auth/jwt-auth.guard';
// import { Role } from 'src/core/auth/role.enum';
// import { Roles } from 'src/core/auth/roles.decorator';
// import { RolesGuard } from 'src/core/auth/roles.guard';
// import { DeleteResult, UpdateResult } from 'typeorm';
// import { User } from '../user/entities/user.entity';
// import { CreateTenantDto } from './dto/create-tenant.dto';
// import { UpdateTenantDto } from './dto/update-tenant.dto';
// import { Tenant } from './entities/tenant.entity';
// import { TenantService } from './tenant.service';

// @ApiTags('Tenant')
// @Controller('tenant')
// export class TenantController {
//   constructor(private readonly tenantService: TenantService) { }

//   @Post()
//   @UseGuards(JwtAuthenticationGuard, RolesGuard)
//   @Roles(Role.ADMIN)
//   create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
//     return this.tenantService.create(createTenantDto);
//   }

//   @Get()
//   @UseGuards(JwtAuthenticationGuard, RolesGuard)
//   @Roles(Role.ADMIN)
//   findAll(): Promise<Tenant[]> {
//     return this.tenantService.findAll();
//   }

//   @Get('/me')
//   @UseGuards(JwtAuthenticationGuard)
//   getMe(@GetUser() user: User) {
//     return user;
//   }

//   @Get(':id')
//   @UseGuards(JwtAuthenticationGuard, RolesGuard, AssignedTenant)
//   @Roles(Role.ADMIN, Role.TENANT_ADMIN, Role.USER)
//   findOne(@Param('id') id: string): Promise<Tenant> {
//     return this.tenantService.findOne(+id);
//   }

//   @Patch(':id')
//   @UseGuards(JwtAuthenticationGuard, RolesGuard)
//   @Roles(Role.ADMIN)
//   update(
//     @Param('id') id: string,
//     @Body() updateTenantDto: UpdateTenantDto,
//   ): Promise<UpdateResult> {
//     return this.tenantService.update(+id, updateTenantDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<DeleteResult> {
//     return this.tenantService.remove(+id);
//   }

//   @Get(':id/users')
//   getUsers(@Param('id') id: number) {
//     return this.tenantService.getTenantUsers(id).then((usrs) => {
//       return usrs.map((usr) => {
//         const { passwordHash, ...user } = usr;
//         return user;
//       });
//     });
//   }
// }
