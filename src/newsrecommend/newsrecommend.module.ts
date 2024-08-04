import { Module } from '@nestjs/common';


import { PrismaService } from 'src/prisma/prisma.service';
import { NewsrecommendController } from './newsrecommend.controller';
import { NewsrecommendService } from './newsrecommend.service';

@Module({
  controllers: [NewsrecommendController],
  providers: [NewsrecommendService, PrismaService],
})
export class NewsrecommendModule {}

