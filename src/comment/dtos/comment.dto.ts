import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  newsId: string;

  @IsUUID()
  authorId: string;

  @IsString()
  content: string;
}

export class UpdateCommentDto {
  @IsUUID()
  authorId: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export class CommentDto {
  @IsUUID()
  id: string;

  @IsUUID()
  newsId: string;

  @IsUUID()
  authorId: string;

  @IsString()
  content: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
