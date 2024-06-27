import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChangePasswordDto,
  FilterUserDto,
  PaginatedResult,
  UserDto,
  notification,
} from './dtos/user.dto';
import { hash, compare } from 'bcrypt';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: FilterUserDto): Promise<PaginatedResult<User>> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;
    const keyword = query.search || '';

    const filter: Prisma.UserWhereInput = {
      OR: [
        { username: { contains: keyword } },
        { email: { contains: keyword } },
        { fullName: { contains: keyword } },
      ],
    };

    const [res, total] = await Promise.all([
      this.prisma.user.findMany({
        where: filter,
        skip,
        take: itemsPerPage,
        select: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          profilePictureURL: true,
          passwordHash: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({ where: filter }),
    ]);

    const lastPage = Math.ceil(total / itemsPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        profilePictureURL: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UserDto): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        profilePictureURL: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async remove(id: string): Promise<notification> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.user.delete({
      where: { id },
    });
    return { message: 'Remove user success' };
  }
  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<notification> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const isPasswordValid = await compare(
      changePasswordDto.currentPassword,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const newPasswordHash = await hash(changePasswordDto.newPassword, 10);
    await this.prisma.user.update({
      where: { id },
      data: { passwordHash: newPasswordHash },
    });

    return { message: 'Password changed successfully' };
  }
}
