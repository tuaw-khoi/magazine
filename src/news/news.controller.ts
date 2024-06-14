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
import { Roles } from 'src/decorator/roles.decorator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Roles('ADMIN', 'AUTHOR')
  @Post()
  create(@Body() createNewsDto: CreateNewsDto): Promise<NewsDto> {
    return this.newsService.create(createNewsDto);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get()
  findAll(): Promise<NewsDto[]> {
    return this.newsService.findAll();
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get(':id')
  findOne(@Param('id') id: string): Promise<NewsDto> {
    return this.newsService.findOne(id);
  }
  @Roles('ADMIN', 'AUTHOR')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<NewsDto> {
    return this.newsService.update(id, updateNewsDto);
  }
  @Roles('ADMIN', 'AUTHOR')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.newsService.remove(id);
  }
}
