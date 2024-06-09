import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  SubscriptionDto,
} from './dtos/subscription.dto';
import { Subscription } from '@prisma/client';
import { notification } from 'src/user/dtos/user.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    // Kiểm tra sự tồn tại của userId
    const userExists = await this.prisma.user.findUnique({
      where: { id: createSubscriptionDto.userId },
    });
    if (!userExists) {
      throw new BadRequestException(
        `User with ID ${createSubscriptionDto.userId} does not exist`,
      );
    }

    const subscription = await this.prisma.subscription.create({
      data: createSubscriptionDto,
    });
    return this.toSubscriptionDto(subscription);
  }

  async findAll(): Promise<SubscriptionDto[]> {
    const subscriptions = await this.prisma.subscription.findMany();
    return subscriptions.map((subscription) =>
      this.toSubscriptionDto(subscription),
    );
  }

  async findOne(id: string): Promise<SubscriptionDto> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return this.toSubscriptionDto(subscription);
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    const updatedSubscription = await this.prisma.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });

    return this.toSubscriptionDto(updatedSubscription);
  }

  async remove(id: string): Promise<notification> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    await this.prisma.subscription.delete({
      where: { id },
    });

    return { message: 'remove subscription success' };
  }

  private toSubscriptionDto(subscription: Subscription): SubscriptionDto {
    return {
      id: subscription.id,
      userId: subscription.userId,
      subscriptionDate: subscription.subscriptionDate,
      active: subscription.active,
      createdAt: subscription.createdAt,
    };
  }
}
