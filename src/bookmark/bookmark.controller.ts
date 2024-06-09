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

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto): Promise<BookmarkDto> {
    return this.bookmarkService.create(createBookmarkDto);
  }

  @Get()
  findAll(): Promise<BookmarkDto[]> {
    return this.bookmarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookmarkDto> {
    return this.bookmarkService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<BookmarkDto> {
    return this.bookmarkService.update(id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.bookmarkService.remove(id);
  }
}
