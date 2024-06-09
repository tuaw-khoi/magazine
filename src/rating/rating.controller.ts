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

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto): Promise<RatingDto> {
    return this.ratingService.create(createRatingDto);
  }

  @Get()
  findAll(): Promise<RatingDto[]> {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RatingDto> {
    return this.ratingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<RatingDto> {
    return this.ratingService.update(id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.ratingService.remove(id);
  }
}
