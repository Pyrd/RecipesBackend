import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '~/api/common/images/images.module';

@Module({
  controllers: [ItemsController],
  imports: [ImagesModule, TypeOrmModule.forFeature([Item])],

  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
