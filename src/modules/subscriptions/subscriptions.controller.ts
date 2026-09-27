import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";

import { Request } from "express";

import { SubscriptionsService } from "./subscriptions.service";
import { JwtAuthGuard } from "../auth/guards/jwtAuthGuards";
import { ChangePlanDto } from "./dto/changePlan.dto";

import {
  ApiAuth,
  ApiError,
  ApiSuccess,
} from "../../common/decorators/swagger.decorator";

@Controller("subscriptions")
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @ApiAuth(
    "Subscriptions",
    "Get current user subscription",
  )
  @ApiSuccess(
    "Subscription retrieved successfully",
  )
  @ApiError(
    404,
    "Subscription not found",
  )
  @Get()
  getSubscription(@Req() req: Request) {
    const user = req.user as {
      id: string;
    };

    return this.subscriptionsService.getSubscription(
      user.id,
    );
  }

  @ApiAuth(
    "Subscriptions",
    "Change subscription plan",
  )
  @ApiSuccess(
    "Subscription plan changed successfully",
  )
  @ApiError(
    400,
    "Invalid subscription plan",
  )
  @Patch("plan")
  changePlan(
    @Req() req: Request,
    @Body() data: ChangePlanDto,
  ) {
    const user = req.user as {
      id: string;
    };

    return this.subscriptionsService.changePlan(
      user.id,
      data,
    );
  }

  @ApiAuth(
    "Subscriptions",
    "Get subscription usage",
  )
  @ApiSuccess(
    "Subscription usage retrieved successfully",
  )
  @Get("usage")
  getUsage(@Req() req: Request) {
    const user = req.user as {
      id: string;
    };

    return this.subscriptionsService.getUsage(
      user.id,
    );
  }
}