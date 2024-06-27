import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Technology',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'All about technology and gadgets',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Technology',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'All about technology and gadgets',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CategoryDto {
  @ApiProperty({
    description: 'The ID of the category',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Technology',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'All about technology and gadgets',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The date and time when the category was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the category was last updated',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  updatedAt: Date;
}

export class FilterCategoryDto {
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
    description: 'Search keyword for filtering',
    example: 'Tech',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
