import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateNewsDto {
  @IsString()
  authorId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsDateString()
  publishedDate?: Date;

  @IsString()
  categoryId: string;
}
export class UpdateNewsDto {
  @IsNotEmpty()
  @IsString()
  authorId: string;
  
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()
  publishedDate?: Date;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
export class NewsDto {
  @IsString()
  id: string;

  @IsString()
  authorId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsDateString()
  publishedDate?: Date;

  @IsString()
  categoryId: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
