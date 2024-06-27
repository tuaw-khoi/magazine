import { UserRole } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: 'hashedpassword123',
    required: false,
  })
  @IsString()
  @IsOptional()
  passwordHash?: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: 'The profile picture URL of the user',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  profilePictureURL?: string;

  @ApiProperty({
    description: 'The role of the user',
    example: UserRole.USER,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The current password of the user',
    example: 'currentpassword123',
  })
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @ApiProperty({
    description: 'The new password of the user',
    example: 'newpassword123',
  })
  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class notification {
  @ApiProperty({
    description: 'Notification message',
    example: 'Operation successful',
  })
  @IsString()
  message: string;
}

export class FilterUserDto {
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
    example: 'john',
    required: false,
  })
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
  @ApiProperty({
    description: 'The ID of the user',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: 'hashedpassword123',
    required: false,
  })
  @IsString()
  @IsOptional()
  passwordHash?: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: 'The profile picture URL of the user',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  profilePictureURL?: string;

  @ApiProperty({
    description: 'The role of the user',
    example: UserRole.USER,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
