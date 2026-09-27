import {
  Controller,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";

import { Request } from "express";


import { Roles } from "../../common/decorators/roles.decorator";

import { Role } from "../../generated/prisma/client";

import {
  ApiAuth,
  ApiSuccess,
} from "../../common/decorators/swagger.decorator";
import { JwtAuthGuard } from "../auth/guards/jwtAuthGuards";
import { RolesGuard } from "../../common/guards/roles.guards";
import { UsageLogsService } from "./usageLogs.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Controller("usage-logs")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsageLogsController {
  constructor(
    private readonly usageLogsService: UsageLogsService,
  ) {}

  // -------------------------
  // User logs
  // -------------------------

  @ApiAuth(
    "Usage Logs",
    "Get current user's API usage logs",
  )
  @ApiSuccess(
    "User API usage logs retrieved successfully",
  )
  @Roles(Role.USER, Role.ADMIN)
  @Get()
  getMyLogs(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.usageLogsService.getUserLogs(
      req.user.id,
    );
  }

  // -------------------------
  // Admin logs
  // -------------------------

  @ApiAuth(
    "Usage Logs",
    "Get all API usage logs",
  )
  @ApiSuccess(
    "All API usage logs retrieved successfully",
  )
  @Roles(Role.ADMIN)
  @Get("all")
  getAllLogs() {
    return this.usageLogsService.getAllLogs();
  }
}