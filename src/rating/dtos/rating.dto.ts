import {
  IsInt,
  IsUUID,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({
    description: 'The ID of the news being rated',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  newsId: string;

  @ApiProperty({
    description: 'The ID of the user giving the rating',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The rating given by the user',
    example: 5,
  })
  @IsInt()
  rating: number;
}

export class UpdateRatingDto {
  @ApiProperty({
    description: 'The ID of the user giving the rating',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The updated rating given by the user',
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsInt()
  rating?: number;
}

export class DeleteRatingDto {
  @ApiProperty({
    description: 'The ID of the user giving the rating',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class RatingDto {
  @ApiProperty({
    description: 'The ID of the rating',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The ID of the news being rated',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  newsId: string;

  @ApiProperty({
    description: 'The ID of the user giving the rating',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The rating given by the user',
    example: 5,
  })
  @IsInt()
  rating: number;

  @ApiProperty({
    description: 'The date and time when the rating was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: Date;
}
