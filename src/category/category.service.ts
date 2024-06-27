import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, FilterCategoryDto } from './dtos/category.dto';
import { UpdateCategoryDto } from './dtos/category.dto';
import { CategoryDto } from './dtos/category.dto';
import { Category } from '@prisma/client';
import { PaginatedResult, notification } from 'src/user/dtos/user.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return this.toCategoryDto(category);
  }

  async findAll(
    query: FilterCategoryDto,
  ): Promise<PaginatedResult<CategoryDto>> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;

    const filter: any = {};
    if (query.search) {
      filter.OR = [
        { name: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const [res, total] = await Promise.all([
      this.prisma.category.findMany({
        where: filter,
        skip,
        take: itemsPerPage,
      }),
      this.prisma.category.count({ where: filter }),
    ]);

    const lastPage = Math.ceil(total / itemsPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res.map((category) => this.toCategoryDto(category)),
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
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
