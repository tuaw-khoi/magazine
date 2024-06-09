import { IsUUID, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  userId: string;

  @IsDateString()
  subscriptionDate: Date;

  @IsBoolean()
  active: boolean;
}

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsDateString()
  subscriptionDate?: Date;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class SubscriptionDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsDateString()
  subscriptionDate: Date;

  @IsBoolean()
  active: boolean;

  @IsDateString()
  createdAt: Date;
}
