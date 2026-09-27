import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { RefreshTokenDto } from "./dto/refresh-token.dto";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
  summary: "Register a new user",
})
@ApiResponse({
  status: 201,
  description: "User registered successfully",
})
@ApiResponse({
  status: 409,
  description: "Email already exists",
})
  @Post("register")
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }


  @ApiOperation({
  summary: "Login user",
})
@ApiResponse({
  status: 200,
  description: "Login successful",
})
@ApiResponse({
  status: 401,
  description: "Invalid credentials",
})
  @Post("login")
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }


  @ApiOperation({
  summary: "Generate a new access token",
})
@ApiResponse({
  status: 200,
  description: "New access token generated",
})
@ApiResponse({
  status: 401,
  description: "Invalid or expired refresh token",
})
  @Post("refresh")
  refreshToken(@Body() data: RefreshTokenDto) {
    return this.authService.refreshToken(data);
  }


  @ApiOperation({
  summary: "Logout user",
})
@ApiBearerAuth("access-token")
@ApiResponse({
  status: 200,
  description: "Logout successful",
})
  @Post("logout")
  logout(@Body() data: RefreshTokenDto) {
    return this.authService.logout(data);
  }
}