import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export enum SubscriptionPlan {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

export class ChangePlanDto {
  @ApiProperty({
    enum: SubscriptionPlan,
    example: "PREMIUM",
    description: "Subscription plan",
  })
  @IsEnum(SubscriptionPlan)
  plan: SubscriptionPlan;
}