import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dtos/tag.dtos';
import { UpdateTagDto } from './dtos/tag.dtos';
import { TagDto } from './dtos/tag.dtos';
import { notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { isPublic } from 'src/decorator/public.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Roles('ADMIN')
  @Post()
  @ApiResponse({ status: 201, description: 'Tag successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createTagDto: CreateTagDto): Promise<TagDto> {
    return this.tagService.create(createTagDto);
  }

  @isPublic()
  @Get()
  @ApiResponse({ status: 200, description: 'Tags successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll(): Promise<TagDto[]> {
    return this.tagService.findAll();
  }

  @isPublic()
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Tag successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  findOne(@Param('id') id: string): Promise<TagDto> {
    return this.tagService.findOne(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Tag successfully updated' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<TagDto> {
    return this.tagService.update(id, updateTagDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Tag successfully deleted' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  remove(@Param('id') id: string): Promise<notification> {
    return this.tagService.remove(id);
  }
}
