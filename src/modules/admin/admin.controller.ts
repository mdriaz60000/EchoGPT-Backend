import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
} from "@nestjs/common";

import { Role } from "../../generated/prisma/client";


import { Roles } from "../../common/decorators/roles.decorator";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "../auth/guards/jwtAuthGuards";
import { RolesGuard } from "../../common/guards/roles.guards";
import { UpdateUserStatusDto } from "./dto/upadateUserStatusDto";
import { ApiAuth, ApiError, ApiSuccess } from "../../common/decorators/swagger.decorator";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}


    @ApiAuth(
    "Admin",
    "Get admin dashboard",
  )
  @ApiSuccess(
    "Admin dashboard retrieved successfully",
  )
  @Get("dashboard")
  getDashboard() {
    return this.adminService.getDashboard();
  }

    @ApiAuth(
    "Admin",
    "Get all users",
  )
  @ApiSuccess(
    "Users retrieved successfully",
  )
@Get("users")
getUsers() {
  return this.adminService.getUsers();
}


  @ApiAuth(
    "Admin",
    "Update user active status",
  )
  @ApiSuccess(
    "User status updated successfully",
  )
  @ApiError(
    404,
    "User not found",
  )
@Patch("users/:id/status")
updateUserStatus(
  @Param("id") userId: string,
  @Body() data: UpdateUserStatusDto,
) {
  return this.adminService.updateUserStatus(
    userId,
    data.isActive,
  );
}


  @ApiAuth(
    "Admin",
    "Get all subscriptions",
  )
  @ApiSuccess(
    "Subscriptions retrieved successfully",
  )
@Get("subscriptions")
getSubscriptions() {
  return this.adminService.getSubscriptions();
}


  @ApiAuth(
    "Admin",
    "Get API usage analytics",
  )
  @ApiSuccess(
    "Usage analytics retrieved successfully",
  )
@Get("usage")
getUsageAnalytics() {
  return this.adminService.getUsageAnalytics();
}

  @ApiAuth(
    "Admin",
    "Get all AI providers",
  )
  @ApiSuccess(
    "AI providers retrieved successfully",
  )
@Get("providers")
getProviders() {
  return this.adminService.getProviders();
}


@ApiAuth(
    "Admin",
    "Get system health",
  )
  @ApiSuccess(
    "System health retrieved successfully",
  )
@Get("system-health")
getSystemHealth() {
  return this.adminService.getSystemHealth();
}

}