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

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Post()
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.create(createSubscriptionDto);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get()
  findAll(): Promise<SubscriptionDto[]> {
    return this.subscriptionService.findAll();
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Get(':id')
  findOne(@Param('id') id: string): Promise<SubscriptionDto> {
    return this.subscriptionService.findOne(id);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.update(id, updateSubscriptionDto);
  }
  @Roles('ADMIN', 'AUTHOR', 'USER')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<notification> {
    return this.subscriptionService.remove(id);
  }
}
