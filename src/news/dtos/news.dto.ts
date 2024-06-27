import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    description: 'The ID of the author',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  authorId: string;

  @ApiProperty({
    description: 'The title of the news',
    example: 'Breaking News: Something Happened',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the news',
    example: 'This is the content of the news.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The date the news was published',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  publishedDate?: Date;

  @ApiProperty({
    description: 'The ID of the category associated with the news',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  categoryId: string;
}

export class UpdateNewsDto {
  @ApiProperty({
    description: 'The ID of the author',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @ApiProperty({
    description: 'The title of the news',
    example: 'Updated News Title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The content of the news',
    example: 'This is the updated content of the news.',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'The date the news was published',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  publishedDate?: Date;

  @ApiProperty({
    description: 'The ID of the category associated with the news',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsString()
  categoryId?: string;
}

export class NewsDto {
  @ApiProperty({
    description: 'The ID of the news',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The ID of the author',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  authorId: string;

  @ApiProperty({
    description: 'The title of the news',
    example: 'Breaking News: Something Happened',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the news',
    example: 'This is the content of the news.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The date the news was published',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  publishedDate?: Date;

  @ApiProperty({
    description: 'The ID of the category associated with the news',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'The date and time when the news was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the news was last updated',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  updatedAt: Date;
}

export class FilterNewsDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({
    description: 'Number of items per page for pagination',
    example: '10',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  items_per_page?: string;

  @ApiProperty({
    description: 'Filter by author ID',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @ApiProperty({
    description: 'Filter by category ID',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    description: 'Search keyword for filtering',
    example: 'Breaking News',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
