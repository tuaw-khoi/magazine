import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewsDto, FilterNewsDto } from './dtos/news.dto';
import { UpdateNewsDto } from './dtos/news.dto';
import { NewsDto } from './dtos/news.dto';
import { News } from '@prisma/client';
import { PaginatedResult, notification } from 'src/user/dtos/user.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsDto> {
    const news = await this.prisma.news.create({
      data: createNewsDto,
    });
    return this.toNewsDto(news);
  }

  async findAll(query: FilterNewsDto): Promise<PaginatedResult<NewsDto>> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;

    const filter: any = {};
    if (query.authorId) {
      filter.authorId = query.authorId;
    }
    if (query.categoryId) {
      filter.categoryId = query.categoryId;
    }
    if (query.search) {
      filter.OR = [
        { title: { contains: query.search } },
        { content: { contains: query.search } },
      ];
    }

    const [res, total] = await Promise.all([
      this.prisma.news.findMany({
        where: filter,
        skip,
        take: itemsPerPage,
      }),
      this.prisma.news.count({ where: filter }),
    ]);

    const lastPage = Math.ceil(total / itemsPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res.map((news) => this.toNewsDto(news)),
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findOne(id: string): Promise<NewsDto> {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return this.toNewsDto(news);
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<NewsDto> {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    if (news.authorId != updateNewsDto.authorId) {
      throw new NotFoundException(`Author Id not match`);
    }

    const updatedNews = await this.prisma.news.update({
      where: { id },
      data: updateNewsDto,
    });

    return this.toNewsDto(updatedNews);
  }

  async remove(id: string): Promise<notification> {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    await this.prisma.news.delete({
      where: { id },
    });

    return { message: 'remove news success' };
  }

  private toNewsDto(news: News): NewsDto {
    return {
      id: news.id,
      authorId: news.authorId,
      title: news.title,
      content: news.content,
      publishedDate: news.publishedDate,
      categoryId: news.categoryId,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    };
  }
}
