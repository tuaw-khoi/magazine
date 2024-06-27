import { PaginatedResult } from './../user/dtos/user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
  CommentDto,
  FilterCommentDto,
} from './dtos/comment.dto';
import { UserResDto, notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { isPublic } from 'src/decorator/public.decorator';
import { User } from 'src/decorator/user.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  @ApiResponse({ status: 201, description: 'Comment successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createCommentDto: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(createCommentDto);
  }

  @isPublic()
  @Get()
  @ApiResponse({ status: 200, description: 'Comments successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll(
    @Query() query: FilterCommentDto,
  ): Promise<PaginatedResult<CommentDto>> {
    return this.commentService.findAll(query);
  }

  @isPublic()
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Comment successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  findOne(@Param('id') id: string): Promise<CommentDto> {
    return this.commentService.findOne(id);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Comment successfully updated' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.commentService.update(id, updateCommentDto);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Comment successfully deleted' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  remove(
    @Param('id') id: string,
    @User() user: UserResDto,
  ): Promise<notification> {
    return this.commentService.remove(id, user);
  }
}
