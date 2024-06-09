import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dtos/tag.dtos';
import { UpdateTagDto } from './dtos/tag.dtos';
import { TagDto } from './dtos/tag.dtos';
import { Tag } from '@prisma/client';
import { notification } from 'src/user/dtos/user.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto): Promise<TagDto> {
    const tag = await this.prisma.tag.create({
      data: createTagDto,
    });
    return this.toTagDto(tag);
  }

  async findAll(): Promise<TagDto[]> {
    const tags = await this.prisma.tag.findMany();
    return tags.map((tag) => this.toTagDto(tag));
  }

  async findOne(id: string): Promise<TagDto> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return this.toTagDto(tag);
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<TagDto> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    const updatedTag = await this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });

    return this.toTagDto(updatedTag);
  }

  async remove(id: string): Promise<notification> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    await this.prisma.tag.delete({
      where: { id },
    });

    return { message: 'remove tag success' };
  }

  private toTagDto(tag: Tag): TagDto {
    return {
      id: tag.id,
      name: tag.name,
      description: tag.description,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    };
  }
}
