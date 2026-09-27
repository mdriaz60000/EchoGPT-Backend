import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwtAuthGuards";
import { UpdateProfileDto } from "./dto/updateProfile.dto";
import { ChangePasswordDto } from "./dto/changePassword.dto";

import {
  ApiAuth,
  ApiError,
  ApiSuccess,
} from "../../common/decorators/swagger.decorator";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiAuth(
    "Users",
    "Get user profile",
  )
  @ApiSuccess(
    "User profile retrieved successfully",
  )
  @ApiError(404, "User not found")
  @Get(":id")
  getProfile(
    @Param("id") id: string,
  ) {
    return this.usersService.findById(id);
  }

  @ApiAuth(
    "Users",
    "Update user profile",
  )
  @ApiSuccess(
    "User profile updated successfully",
  )
  @ApiError(404, "User not found")
  @Patch(":id")
  updateProfile(
    @Param("id") id: string,
    @Body() data: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(
      id,
      data,
    );
  }

  @ApiAuth(
    "Users",
    "Change user password",
  )
  @ApiSuccess(
    "Password changed successfully",
  )
  @ApiError(
    400,
    "Current password is incorrect",
  )
  @Patch(":id/password")
  changePassword(
    @Param("id") id: string,
    @Body() data: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(
      id,
      data.currentPassword,
      data.newPassword,
    );
  }

  @ApiAuth(
    "Users",
    "Delete user account",
  )
  @ApiSuccess(
    "User account deleted successfully",
  )
  @ApiError(404, "User not found")
  @Delete(":id")
  deleteAccount(
    @Param("id") id: string,
  ) {
    return this.usersService.deleteAccount(id);
  }
}