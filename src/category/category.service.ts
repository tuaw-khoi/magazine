import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dtos/category.dto';
import { UpdateCategoryDto } from './dtos/category.dto';
import { CategoryDto } from './dtos/category.dto';
import { Category } from '@prisma/client';
import { notification } from 'src/user/dtos/user.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return this.toCategoryDto(category);
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => this.toCategoryDto(category));
  }

  async findOne(id: string): Promise<CategoryDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.toCategoryDto(category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    return this.toCategoryDto(updatedCategory);
  }

  async remove(id: string): Promise<notification> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return { message: 'remove category success' };
  }

  private toCategoryDto(category: Category): CategoryDto {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
