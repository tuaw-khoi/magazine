import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { News, Rating } from '@prisma/client';
import { PaginationDto } from './dtos/newsrecommend.dto';

@Injectable()
export class NewsrecommendService {
  constructor(private prisma: PrismaService) {}

  async recommendArticles(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<News[]> {
    // Lấy 10 bài viết gần nhất mà người dùng đã đánh giá
    const recentRatings = await this.prisma.rating.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { News: true },
    });

    const userCategories = recentRatings.flatMap(
      (rating) => rating.News.categoryId,
    );

    const userRatings = await this.prisma.rating.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { News: true },
    });

    const ratedNewsIds = userRatings.map((rating) => rating.newsId);

    const allNews = await this.prisma.news.findMany({
      where: {
        categoryId: { in: userCategories },
        id: { notIn: ratedNewsIds },
      },
      orderBy: { createdAt: 'desc' },
      take: paginationDto.limit,
      skip: (paginationDto.page - 1) * paginationDto.limit,
      include: {
        Ratings: true,
      },
    });


    return allNews;
  }
}
