import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dtos/news.dto';
import { UpdateNewsDto } from './dtos/news.dto';
import { NewsDto } from './dtos/news.dto';
import { notification } from 'src/user/dtos/user.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto): Promise<NewsDto> {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll(): Promise<NewsDto[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NewsDto> {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<NewsDto> {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.newsService.remove(id);
  }
}
