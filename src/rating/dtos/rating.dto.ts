import {
  IsInt,
  IsUUID,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateRatingDto {
  @IsUUID()
  newsId: string;

  @IsUUID()
  userId: string;

  @IsInt()
  rating: number;
}

export class UpdateRatingDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsInt()
  rating?: number;
}

export class DeleteRatingDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

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
