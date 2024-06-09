import { Controller, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto, UserDto, notification } from './dtos/user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.userService.remove(id);
  }
  @Patch('change-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<notification> {
    return this.userService.changePassword(id, changePasswordDto);
  }
}
