import { UserRole } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  IsNumberString,
} from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  passwordHash?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  profilePictureURL?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}
export class notification {
  @IsString()
  message: string;
}
export class FilterUserDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  items_per_page?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}
export class UserResDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  passwordHash?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  profilePictureURL?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
