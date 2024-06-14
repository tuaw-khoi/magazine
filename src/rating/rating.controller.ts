import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto, UpdateRatingDto, RatingDto } from './dtos/rating.dto';
import { notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  create(@Body() createRatingDto: CreateRatingDto): Promise<RatingDto> {
    return this.ratingService.create(createRatingDto);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get()
  findAll(): Promise<RatingDto[]> {
    return this.ratingService.findAll();
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get(':id')
  findOne(@Param('id') id: string): Promise<RatingDto> {
    return this.ratingService.findOne(id);
  }
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<RatingDto> {
    return this.ratingService.update(id, updateRatingDto);
  }
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.ratingService.remove(id);
  }
}
