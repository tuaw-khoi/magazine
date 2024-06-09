import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
  CommentDto,
} from './dtos/comment.dto';
import { notification } from 'src/user/dtos/user.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll(): Promise<CommentDto[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CommentDto> {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.commentService.remove(id);
  }
}
