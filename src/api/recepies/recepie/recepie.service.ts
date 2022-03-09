import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { id_generator } from '~/utils/generate-id';
import { ItemsService } from '../items/items.service';
import { RecepieStatus } from '../shared/recepie-status.enum';
import { CreateRecepieDto } from './dto/create-recepie.dto';
import { UpdateRecepieDto } from './dto/update-recepie.dto';
import { Recepie } from './entities/recepie.entity';

@Injectable()
export class RecepieService {
  logger = new Logger(RecepieService.name);
  constructor(
    @InjectRepository(Recepie)
    private readonly recepieRepository: Repository<Recepie>,
    private readonly itemsService: ItemsService,
  ) {}

  async create(createRecepieDto: CreateRecepieDto) {
    const entity = this.recepieRepository.create(createRecepieDto);
    if (entity.access == 0) {
      entity.status = RecepieStatus.TO_BE_APPROVED;
    } else {
      entity.status = RecepieStatus.ACTIVE;
    }
    entity.id = id_generator(10);
    const recepie = await this.recepieRepository.save(entity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException('Failed to save recepie !');
    });

    return recepie;
  }

  async findAll() {
    const recepies = await this.recepieRepository
      .find({ relations: ['author'] })
      .catch(() => {
        throw new InternalServerErrorException('Failed to find all !');
      });
    return recepies;
  }

  async findOne(id: string) {
    const recepie = await this.recepieRepository.findOne(id).catch(() => {
      throw new InternalServerErrorException(
        `Failed to find recepie id: ${id} !`,
      );
    });
    return recepie;
  }

  async update(id: string, updateRecepieDto: UpdateRecepieDto) {
    const entity = this.recepieRepository.create(updateRecepieDto);
    entity.id = id;
    const recepie = await this.recepieRepository
      .save(updateRecepieDto)
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to update recepie id: ${id} !`,
        );
      });
    return recepie;
  }

  async findItemsOfOne(id: string) {
    const recepie = await this.findOne(id);
    const promises = [];
    for (const item of recepie.items) {
      const prom = new Promise(async (resolve, reject) => {
        const resp = await this.itemsService.findOne(item.item_id);
        resolve({
          ...item,
          item: resp,
        });
      });
      // const promise = this.itemsService.findOne(item.item_id);
      promises.push(prom);
    }
    const items = await Promise.all(promises);
    return items;
  }

  async remove(id: string) {
    await this.recepieRepository.delete(id).catch(() => {
      throw new InternalServerErrorException(
        `Failed to delete recepie id: ${id} !`,
      );
    });
    return { message: 'SUCCESS' };
  }

  // private generateShowcase() {}

  async generateExploreRecepie() {
    const resp = {
      showcase: [],
    };

    resp.showcase = await this.recepieRepository.find({
      select: [
        'id',
        'name',
        'description',
        'person_count',
        'person_count_unit',
        'cost',
        'difficulty',
        'total_duration',
        'tags',
      ],
      where: { access: 0 },
    });
    console.log(resp.showcase);
    return resp;
  }
}
