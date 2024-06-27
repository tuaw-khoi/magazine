import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import {
  CreateBookmarkDto,
  BookmarkDto,
  FilterBookmarkDto,
} from './dtos/bookmark.dto';
import {
  PaginatedResult,
  UserResDto,
  notification,
} from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/decorator/user.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Bookmark')
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  @ApiResponse({ status: 201, description: 'Bookmark successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createBookmarkDto: CreateBookmarkDto): Promise<BookmarkDto> {
    return this.bookmarkService.create(createBookmarkDto);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get()
  @ApiResponse({ status: 200, description: 'Bookmarks successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll(
    @Query() query: FilterBookmarkDto,
  ): Promise<PaginatedResult<BookmarkDto>> {
    return this.bookmarkService.findAll(query);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Bookmark successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Bookmark not found' })
  findOne(@Param('id') id: string): Promise<BookmarkDto> {
    return this.bookmarkService.findOne(id);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Bookmark successfully deleted' })
  @ApiResponse({ status: 404, description: 'Bookmark not found' })
  remove(
    @Param('id') id: string,
    @User() user: UserResDto,
  ): Promise<notification> {
    return this.bookmarkService.remove(id, user);
  }
}
