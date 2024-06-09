import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateBookmarkDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  newsId: string;
}

export class UpdateBookmarkDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  newsId?: string;
}

export class BookmarkDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  newsId: string;

  @IsDateString()
  createdAt: Date;
}
