import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";


import { SearchDto } from "./dto/search.dto";

import { JwtAuthGuard } from "../auth/guards/jwtAuthGuards";
import { WebSearchService } from "./webSearch.service";
import { ApiAuth, ApiError, ApiSuccess } from "../../common/decorators/swagger.decorator";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Controller("web-search")
@UseGuards(JwtAuthGuard)
export class WebSearchController {
  constructor(
    private readonly webSearchService: WebSearchService,
  ) {}


   @ApiAuth(
    "Web Search",
    "Search the web",
  )
  @ApiSuccess(
    "Web search completed successfully",
  )
  @ApiError(
    400,
    "Invalid search query",
  )
  @Post()
  search(
    @Req() req: AuthenticatedRequest,
    @Body() data: SearchDto,
  ) {
    return this.webSearchService.search(
      req.user.id,
      data,
    );
  }




  @ApiAuth(
    "Web Search",
    "Get web search history",
  )
  @ApiSuccess(
    "Search history retrieved successfully",
  )
  @Get("history")
  getHistory(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.webSearchService.getHistory(
      req.user.id,
    );
  }
}