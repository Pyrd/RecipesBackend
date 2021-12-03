// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DeleteResult, Repository, UpdateResult } from 'typeorm';
// import { CreateTenantDto } from './dto/create-tenant.dto';
// import { UpdateTenantDto } from './dto/update-tenant.dto';
// import { Tenant } from './entities/tenant.entity';

// @Injectable()
// export class TenantService {
//   constructor(
//     @InjectRepository(Tenant)
//     private readonly tenantRepository: Repository<Tenant>,
//   ) {}
//   create(createTenantDto: CreateTenantDto): Promise<Tenant> {
//     return this.tenantRepository.save(createTenantDto);
//   }

//   findAll(): Promise<Tenant[]> {
//     return this.tenantRepository.find();
//   }

//   findOne(id: number): Promise<Tenant> {
//     return this.tenantRepository.findOne({ id: id });
//   }

//   update(id: number, updateTenantDto: UpdateTenantDto): Promise<UpdateResult> {
//     return this.tenantRepository.update(id, updateTenantDto);
//   }

//   remove(id: number): Promise<DeleteResult> {
//     return this.tenantRepository.delete(id);
//   }

//   async getTenantUsers(id: number) {
//     const qryBldr = await this.tenantRepository
//       .createQueryBuilder('tenant')
//       .leftJoinAndSelect('tenant.users', 'user')
//       .where('tenant.id = :id', {
//         id: id,
//       })
//       .getOne();

//     if (!qryBldr)
//       throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);

//     return qryBldr.users;
//   }
// }
