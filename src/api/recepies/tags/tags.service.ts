import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  logger = new Logger(TagsService.name)
  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {

  }

  async create(createTagDto: CreateTagDto) {
    const entity = this.tagRepository.create(createTagDto)
    const tag = await this.tagRepository.save(entity).catch(() => {
      throw new InternalServerErrorException('Failed to save tag !')
    });

    return tag
  }

  async findAll() {
    const tags = await this.tagRepository.find().catch(() => {
      throw new InternalServerErrorException('Failed to find all !')
    });
    return tags;
  }

  async findOne(id: string) {
    const tag = await this.tagRepository.findOne(id).catch(() => {
      throw new InternalServerErrorException(`Failed to find tag id: ${id} !`)
    });
    return tag
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const entity = this.tagRepository.create(updateTagDto);
    entity.id = id
    const tag = await this.tagRepository.save(updateTagDto).catch(() => {
      throw new InternalServerErrorException(`Failed to update tag id: ${id} !`)
    });
    return tag
  }

  async remove(id: string) {
    await this.tagRepository.delete(id).catch(() => {
      throw new InternalServerErrorException(`Failed to delete tag id: ${id} !`)
    });
    return { message: 'SUCCESS' }
  }
}
