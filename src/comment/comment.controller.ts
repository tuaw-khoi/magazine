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
import { Roles } from 'src/decorator/roles.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(createCommentDto);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get()
  findAll(): Promise<CommentDto[]> {
    return this.commentService.findAll();
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CommentDto> {
    return this.commentService.findOne(id);
  }
  @Roles('ADMIN', 'AUTHOR')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.commentService.update(id, updateCommentDto);
  }
  @Roles('ADMIN', 'AUTHOR')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.commentService.remove(id);
  }
}
