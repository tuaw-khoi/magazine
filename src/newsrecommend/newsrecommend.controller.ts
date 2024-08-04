// src/newsrecommend/newsrecommend.controller.ts
import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { News } from '@prisma/client';
import { NewsrecommendService } from './newsrecommend.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { PaginationDto } from './dtos/newsrecommend.dto';

@ApiBearerAuth()
@ApiTags('Recommendation')
@Controller('recommend')
export class NewsrecommendController {
  constructor(private readonly recommendationService: NewsrecommendService) {}

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get('recommendations/:userId')
  @ApiResponse({ status: 200, description: 'News successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getRecommendations(
    @Param('userId') userId: string,
    @Body() paginationDto: PaginationDto,
  ): Promise<News[]> {
    return this.recommendationService.recommendArticles(userId, paginationDto);
  }
}
