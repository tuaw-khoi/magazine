import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, FilterNewsDto } from './dtos/news.dto';
import { UpdateNewsDto } from './dtos/news.dto';
import { NewsDto } from './dtos/news.dto';
import { PaginatedResult, notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { isPublic } from 'src/decorator/public.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Roles('ADMIN', 'AUTHOR')
  @Post()
  @ApiResponse({ status: 201, description: 'News successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createNewsDto: CreateNewsDto): Promise<NewsDto> {
    return this.newsService.create(createNewsDto);
  }

  @isPublic()
  @Get()
  @ApiResponse({ status: 200, description: 'News successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll(@Query() query: FilterNewsDto): Promise<PaginatedResult<NewsDto>> {
    return this.newsService.findAll(query);
  }

  @isPublic()
  @Get(':id')
  @ApiResponse({ status: 200, description: 'News successfully retrieved' })
  @ApiResponse({ status: 404, description: 'News not found' })
  findOne(@Param('id') id: string): Promise<NewsDto> {
    return this.newsService.findOne(id);
  }

  @Roles('ADMIN', 'AUTHOR')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'News successfully updated' })
  @ApiResponse({ status: 404, description: 'News not found' })
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<NewsDto> {
    return this.newsService.update(id, updateNewsDto);
  }

  @Roles('ADMIN', 'AUTHOR')
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'News successfully deleted' })
  @ApiResponse({ status: 404, description: 'News not found' })
  remove(@Param('id') id: string): Promise<notification> {
    return this.newsService.remove(id);
  }
}
