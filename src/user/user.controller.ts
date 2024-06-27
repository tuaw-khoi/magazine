import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePasswordDto,
  FilterUserDto,
  PaginatedResult,
  UserDto,
  notification,
} from './dtos/user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN')
  @Get()
  @ApiResponse({ status: 200, description: 'Users successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll(@Query() query: FilterUserDto): Promise<PaginatedResult<User>> {
    return this.userService.findAll(query);
  }

  @Roles('ADMIN')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'User successfully retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string): Promise<notification> {
    return this.userService.remove(id);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch('change-password/:id')
  @ApiResponse({ status: 200, description: 'Password successfully changed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<notification> {
    return this.userService.changePassword(id, changePasswordDto);
  }
}
