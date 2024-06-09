import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewsDto } from './dtos/news.dto';
import { UpdateNewsDto } from './dtos/news.dto';
import { NewsDto } from './dtos/news.dto';
import { News } from '@prisma/client';
import { notification } from 'src/user/dtos/user.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsDto> {
    const news = await this.prisma.news.create({
      data: createNewsDto,
    });
    return this.toNewsDto(news);
  }

  async findAll(): Promise<NewsDto[]> {
    const newsList = await this.prisma.news.findMany();
    return newsList.map((news) => this.toNewsDto(news));
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
