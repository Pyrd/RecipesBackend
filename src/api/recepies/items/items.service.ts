import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '~/api/common/images/images.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  logger = new Logger(ItemsService.name);
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly imageService: ImagesService,
  ) {}

  async batchCreate(ingredients: Array<CreateItemDto>) {
    const promises = [];
    console.time('ok');
    for (const ingredient of ingredients) {
      // const entity = await this.itemRepository.create(ingredient);
      // const entity = await this.itemRepository.create(ingredient);
      promises.push(this.create(ingredient));
      // const img = await this.imageService.createEntity(ingredient.image);
      // entity.i
    }
    console.log('length', ingredients.length);
    Promise.all(promises);
    console.timeEnd('ok');

    return { message: 'SUCCESS' };
  }

  async create(createItemDto: CreateItemDto) {
    const entity = this.itemRepository.create(createItemDto);
    entity.code = entity.label_fr.toLocaleLowerCase('fr');
    const item = await this.itemRepository.save(entity).catch((err) => {
      console.error(err);
      throw new InternalServerErrorException('Failed to save item !');
    });

    return item;
  }

  async getStats() {
    return {
      count: await this.itemRepository.count(),
    };
  }

  async search(query: string) {
    const sanitized = query.toLowerCase();
    const result = await this.itemRepository
      .createQueryBuilder('item')
      .where('item.code like :query', { query: `${sanitized}%` })
      .leftJoinAndSelect('item.images', 'images')
      .limit(8)
      .getMany();

    return result.sort((a, b) => {
      if (a.code.length - query.length > b.code.length - query.length) {
        return 1;
      } else if (a.code.length - query.length < b.code.length - query.length) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  async findAll() {
    const items = await this.itemRepository.find().catch(() => {
      throw new InternalServerErrorException('Failed to find all !');
    });
    return items;
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOne(id).catch(() => {
      throw new InternalServerErrorException(`Failed to find item id: ${id} !`);
    });
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const entity = this.itemRepository.create(updateItemDto);
    entity.id = id;
    const item = await this.itemRepository.save(updateItemDto).catch(() => {
      throw new InternalServerErrorException(
        `Failed to update item id: ${id} !`,
      );
    });
    return item;
  }

  async remove(id: number) {
    await this.itemRepository.delete(id).catch(() => {
      throw new InternalServerErrorException(
        `Failed to delete item id: ${id} !`,
      );
    });
    return { message: 'SUCCESS' };
  }
}
