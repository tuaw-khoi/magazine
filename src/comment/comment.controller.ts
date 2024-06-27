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
import { UserResDto, notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { isPublic } from 'src/decorator/public.decorator';
import { User } from 'src/decorator/user.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(createCommentDto);
  }
  @isPublic()
  @Get()
  findAll(): Promise<CommentDto[]> {
    return this.commentService.findAll();
  }
  @isPublic()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CommentDto> {
    return this.commentService.findOne(id);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.commentService.update(id, updateCommentDto);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User() user: UserResDto,
  ): Promise<notification> {
    return this.commentService.remove(id, user);
  }
}
