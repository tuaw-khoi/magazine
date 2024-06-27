import {
  IsString,
  IsUUID,
  IsOptional,
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The ID of the news associated with the comment',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  newsId: string;

  @ApiProperty({
    description: 'The ID of the author of the comment',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  authorId: string;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment.',
  })
  @IsString()
  content: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    description: 'The ID of the author of the comment',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  authorId: string;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is an updated comment.',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;
}

export class CommentDto {
  @ApiProperty({
    description: 'The ID of the comment',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The ID of the news associated with the comment',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  newsId: string;

  @ApiProperty({
    description: 'The ID of the author of the comment',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  authorId: string;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The date and time when the comment was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the comment was last updated',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  updatedAt: Date;
}

export class FilterCommentDto {
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
    description: 'Filter by news ID',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  newsId?: string;

  @ApiProperty({
    description: 'Filter by author ID',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @ApiProperty({
    description: 'Search keyword for filtering',
    example: 'Comment content',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
