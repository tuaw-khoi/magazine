import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto, UserDto, notification } from './dtos/user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles('ADMIN')
  @Get()
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.userService.remove(id);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch('change-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<notification> {
    return this.userService.changePassword(id, changePasswordDto);
  }
}
