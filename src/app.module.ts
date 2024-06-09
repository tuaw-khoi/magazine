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

@Module({
  imports: [PrismaModule, AuthModule, UserModule, NewsModule, CommentModule, CategoryModule, TagModule, RatingModule, BookmarkModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
