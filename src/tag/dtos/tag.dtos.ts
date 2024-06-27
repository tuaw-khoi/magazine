import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Technology',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the tag',
    example: 'All about technology and gadgets',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Technology',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The description of the tag',
    example: 'All about technology and gadgets',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class TagDto {
  @ApiProperty({
    description: 'The ID of the tag',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name of the tag',
    example: 'Technology',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the tag',
    example: 'All about technology and gadgets',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The date and time when the tag was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the tag was last updated',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  updatedAt: Date;
}
