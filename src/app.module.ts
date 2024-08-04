import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { RatingModule } from './rating/rating.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.gruad';
import { NewsrecommendController } from './newsrecommend/newsrecommend.controller';
import { NewsrecommendService } from './newsrecommend/newsrecommend.service';
import { NewsrecommendModule } from './newsrecommend/newsrecommend.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    NewsModule,
    CommentModule,
    CategoryModule,
    TagModule,
    RatingModule,
    BookmarkModule,
    SubscriptionModule,
    NewsrecommendModule,
  ],
  controllers: [AppController, NewsrecommendController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    NewsrecommendService,
  ],
})
export class AppModule {}
