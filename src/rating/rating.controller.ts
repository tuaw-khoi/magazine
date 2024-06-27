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
import {
  CreateRatingDto,
  UpdateRatingDto,
  RatingDto,
  DeleteRatingDto,
} from './dtos/rating.dto';
import { notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { isPublic } from 'src/decorator/public.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Rating')
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  @ApiResponse({ status: 201, description: 'Rating successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createRatingDto: CreateRatingDto): Promise<RatingDto> {
    return this.ratingService.create(createRatingDto);
  }

  @isPublic()
  @Get()
  @ApiResponse({ status: 200, description: 'Ratings successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll(): Promise<RatingDto[]> {
    return this.ratingService.findAll();
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Rating successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  findOne(@Param('id') id: string): Promise<RatingDto> {
    return this.ratingService.findOne(id);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Rating successfully updated' })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<RatingDto> {
    return this.ratingService.update(id, updateRatingDto);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Rating successfully deleted' })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  remove(
    @Param('id') id: string,
    @Body() deleteRatingDto: DeleteRatingDto,
  ): Promise<notification> {
    return this.ratingService.remove(id, deleteRatingDto);
  }
}
