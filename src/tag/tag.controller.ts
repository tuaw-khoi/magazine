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

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto): Promise<TagDto> {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll(): Promise<TagDto[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TagDto> {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<TagDto> {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.tagService.remove(id);
  }
}
