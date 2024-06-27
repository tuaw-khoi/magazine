import {
  IsUUID,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'The ID of the user subscribing',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The date of the subscription',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  subscriptionDate: Date;

  @ApiProperty({
    description: 'Whether the subscription is active',
    example: true,
  })
  @IsBoolean()
  active: boolean;
}

export class UpdateSubscriptionDto {
  @ApiProperty({
    description: 'The ID of the user subscribing',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The date of the subscription',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  subscriptionDate?: Date;

  @ApiProperty({
    description: 'Whether the subscription is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class SubscriptionDto {
  @ApiProperty({
    description: 'The ID of the subscription',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The ID of the user subscribing',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The date of the subscription',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  subscriptionDate: Date;

  @ApiProperty({
    description: 'Whether the subscription is active',
    example: true,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'The date and time when the subscription was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: Date;
}
