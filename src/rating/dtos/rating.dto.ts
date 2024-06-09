import { IsInt, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateRatingDto {
  @IsUUID()
  newsId: string;

  @IsUUID()
  userId: string;

  @IsInt()
  rating: number;
}

export class UpdateRatingDto {
  @IsOptional()
  @IsInt()
  rating?: number;
}

export class RatingDto {
  @IsUUID()
  id: string;

  @IsUUID()
  newsId: string;

  @IsUUID()
  userId: string;

  @IsInt()
  rating: number;

  @IsDateString()
  createdAt: Date;
}
