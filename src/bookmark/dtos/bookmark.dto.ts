import { IsString, IsUUID, IsOptional, IsDateString, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'The ID of the user creating the bookmark',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The ID of the news being bookmarked',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  newsId: string;
}

export class FilterBookmarkDto {
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
    description: 'Filter by user ID',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({
    description: 'Filter by news ID',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  newsId?: string;

  @ApiProperty({
    description: 'Search keyword for filtering',
    example: 'Breaking News',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class UpdateBookmarkDto {
  @ApiProperty({
    description: 'The ID of the news being bookmarked',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  newsId?: string;
}

export class BookmarkDto {
  @ApiProperty({
    description: 'The ID of the bookmark',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The ID of the user who created the bookmark',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The ID of the news being bookmarked',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  newsId: string;

  @ApiProperty({
    description: 'The date and time when the bookmark was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: Date;
}