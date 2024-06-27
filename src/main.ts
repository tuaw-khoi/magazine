import { env } from 'process';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Magazine')
    .setDescription('The magazine API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Bookmark')
    .addTag('Category')
    .addTag('Comment')
    .addTag('News')
    .addTag('Rating')
    .addTag('Subscription')
    .addTag('Tag')
    .addTag('User')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
