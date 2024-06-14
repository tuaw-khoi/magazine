import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import {
  CreateBookmarkDto,
  UpdateBookmarkDto,
  BookmarkDto,
} from './dtos/bookmark.dto';
import { notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto): Promise<BookmarkDto> {
    return this.bookmarkService.create(createBookmarkDto);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get()
  findAll(): Promise<BookmarkDto[]> {
    return this.bookmarkService.findAll();
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookmarkDto> {
    return this.bookmarkService.findOne(id);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<BookmarkDto> {
    return this.bookmarkService.update(id, updateBookmarkDto);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.bookmarkService.remove(id);
  }
}
