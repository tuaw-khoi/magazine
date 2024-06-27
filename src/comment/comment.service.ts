import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
  CommentDto,
  FilterCommentDto,
} from './dtos/comment.dto';
import { Comment } from '@prisma/client';
import { PaginatedResult, UserResDto, notification } from 'src/user/dtos/user.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentDto> {
    // Kiểm tra sự tồn tại của newsId
    const newsExists = await this.prisma.news.findUnique({
      where: { id: createCommentDto.newsId },
    });
    if (!newsExists) {
      throw new BadRequestException(
        `News with ID ${createCommentDto.newsId} does not exist`,
      );
    }

    // Kiểm tra sự tồn tại của authorId
    const authorExists = await this.prisma.user.findUnique({
      where: { id: createCommentDto.authorId },
    });
    if (!authorExists) {
      throw new BadRequestException(
        `Author with ID ${createCommentDto.authorId} does not exist`,
      );
    }

    const comment = await this.prisma.comment.create({
      data: createCommentDto,
    });
    return this.toCommentDto(comment);
  }

  async findAll(query: FilterCommentDto): Promise<PaginatedResult<CommentDto>> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;

    const filter: any = {};
    if (query.newsId) {
      filter.newsId = query.newsId;
    }
    if (query.authorId) {
      filter.authorId = query.authorId;
    }
    if (query.search) {
      filter.OR = [{ content: { contains: query.search } }];
    }

    const [res, total] = await Promise.all([
      this.prisma.comment.findMany({
        where: filter,
        skip,
        take: itemsPerPage,
      }),
      this.prisma.comment.count({ where: filter }),
    ]);

    const lastPage = Math.ceil(total / itemsPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res.map((comment) => this.toCommentDto(comment)),
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findOne(id: string): Promise<CommentDto> {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.toCommentDto(comment);
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (comment.authorId != updateCommentDto.authorId) {
      throw new NotFoundException(`Author Id not match`);
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });

    return this.toCommentDto(updatedComment);
  }

  async remove(id: string, user: UserResDto): Promise<notification> {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (user.role === 'ADMIN' || user.id === comment.authorId) {
      await this.prisma.comment.delete({
        where: { id },
      });
      return { message: 'remove comment success' };
    } else {
      return { message: 'remove comment error' };
    }
  }

  private toCommentDto(comment: Comment): CommentDto {
    return {
      id: comment.id,
      newsId: comment.newsId,
      authorId: comment.authorId,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
