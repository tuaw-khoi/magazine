import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/category.dto';
import { UpdateCategoryDto } from './dtos/category.dto';
import { CategoryDto } from './dtos/category.dto';
import { notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { isPublic } from 'src/decorator/public.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Roles('ADMIN')
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoryService.create(createCategoryDto);
  }
  @isPublic()
  @Get()
  findAll(): Promise<CategoryDto[]> {
    return this.categoryService.findAll();
  }
  @isPublic()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoryService.findOne(id);
  }
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.update(id, updateCategoryDto);
  }
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.categoryService.remove(id);
  }
}
