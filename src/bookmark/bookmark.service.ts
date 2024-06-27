import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBookmarkDto,
  UpdateBookmarkDto,
  BookmarkDto,
  FilterBookmarkDto,
} from './dtos/bookmark.dto';
import { Bookmark } from '@prisma/client';
import { UserResDto, notification } from 'src/user/dtos/user.dto';
interface PaginatedResult<T> {
  data: T[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async create(createBookmarkDto: CreateBookmarkDto): Promise<BookmarkDto> {
    // Kiểm tra sự tồn tại của userId
    const userExists = await this.prisma.user.findUnique({
      where: { id: createBookmarkDto.userId },
    });
    if (!userExists) {
      throw new BadRequestException(
        `User with ID ${createBookmarkDto.userId} does not exist`,
      );
    }

    // Kiểm tra sự tồn tại của newsId
    const newsExists = await this.prisma.news.findUnique({
      where: { id: createBookmarkDto.newsId },
    });
    if (!newsExists) {
      throw new BadRequestException(
        `News with ID ${createBookmarkDto.newsId} does not exist`,
      );
    }

    const bookmark = await this.prisma.bookmark.create({
      data: createBookmarkDto,
    });
    return this.toBookmarkDto(bookmark);
  }

  async findAll(
    query: FilterBookmarkDto,
  ): Promise<PaginatedResult<BookmarkDto>> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;

    const filter: any = {};
    if (query.userId) {
      filter.userId = query.userId;
    }
    if (query.newsId) {
      filter.newsId = query.newsId;
    }
    if (query.search) {
      filter.OR = [
        { userId: { contains: query.search } },
        { newsId: { contains: query.search } },
      ];
    }

    const [res, total] = await Promise.all([
      this.prisma.bookmark.findMany({
        where: filter,
        skip,
        take: itemsPerPage,
      }),
      this.prisma.bookmark.count({ where: filter }),
    ]);

    const lastPage = Math.ceil(total / itemsPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res.map((bookmark) => this.toBookmarkDto(bookmark)),
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findOne(id: string): Promise<BookmarkDto> {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id },
    });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID ${id} not found`);
    }

    return this.toBookmarkDto(bookmark);
  }

  async remove(id: string, user: UserResDto): Promise<notification> {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id },
    });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID ${id} not found`);
    }

    if (bookmark.userId != user.id) {
      throw new NotFoundException(`User Id not match`);
    }

    await this.prisma.bookmark.delete({
      where: { id },
    });

    return { message: 'remove bookmark success' };
  }

  private toBookmarkDto(bookmark: Bookmark): BookmarkDto {
    return {
      id: bookmark.id,
      userId: bookmark.userId,
      newsId: bookmark.newsId,
      createdAt: bookmark.createdAt,
    };
  }
}
