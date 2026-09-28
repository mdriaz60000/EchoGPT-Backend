import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      success: true,
      message: "EchoGPT Backend is running",
    };
  }
}