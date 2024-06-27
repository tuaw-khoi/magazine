import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  SubscriptionDto,
} from './dtos/subscription.dto';
import { notification } from 'src/user/dtos/user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Subscription')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Subscription successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Subscriptions successfully retrieved',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll(): Promise<SubscriptionDto[]> {
    return this.subscriptionService.findAll();
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Subscription successfully retrieved',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found' })
  findOne(@Param('id') id: string): Promise<SubscriptionDto> {
    return this.subscriptionService.findOne(id);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Subscription successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found' })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.update(id, updateSubscriptionDto);
  }

  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Subscription successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found' })
  remove(@Param('id') id: string): Promise<notification> {
    return this.subscriptionService.remove(id);
  }
}
