import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto, UpdateRatingDto, RatingDto } from './dtos/rating.dto';
import { Rating } from '@prisma/client';
import { notification } from 'src/user/dtos/user.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async create(createRatingDto: CreateRatingDto): Promise<RatingDto> {
    // Kiểm tra sự tồn tại của newsId
    const newsExists = await this.prisma.news.findUnique({
      where: { id: createRatingDto.newsId },
    });
    if (!newsExists) {
      throw new BadRequestException(
        `News with ID ${createRatingDto.newsId} does not exist`,
      );
    }

    // Kiểm tra sự tồn tại của userId
    const userExists = await this.prisma.user.findUnique({
      where: { id: createRatingDto.userId },
    });
    if (!userExists) {
      throw new BadRequestException(
        `User with ID ${createRatingDto.userId} does not exist`,
      );
    }

    const rating = await this.prisma.rating.create({
      data: createRatingDto,
    });
    return this.toRatingDto(rating);
  }

  async findAll(): Promise<RatingDto[]> {
    const ratings = await this.prisma.rating.findMany();
    return ratings.map((rating) => this.toRatingDto(rating));
  }

  async findOne(id: string): Promise<RatingDto> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    return this.toRatingDto(rating);
  }

  async update(
    id: string,
    updateRatingDto: UpdateRatingDto,
  ): Promise<RatingDto> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    const updatedRating = await this.prisma.rating.update({
      where: { id },
      data: updateRatingDto,
    });

    return this.toRatingDto(updatedRating);
  }

  async remove(id: string): Promise<notification> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    await this.prisma.rating.delete({
      where: { id },
    });

    return { message: 'remove rating success' };
  }

  private toRatingDto(rating: Rating): RatingDto {
    return {
      id: rating.id,
      newsId: rating.newsId,
      userId: rating.userId,
      rating: rating.rating,
      createdAt: rating.createdAt,
    };
  }
}
