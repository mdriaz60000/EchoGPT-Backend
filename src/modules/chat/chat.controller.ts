import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { Request } from "express";

import { ChatService } from "./chat.service";
import { JwtAuthGuard } from "../auth/guards/jwtAuthGuards";
import { SendMessageDto } from "./dto/sendMessage.dto";

import {
  ApiAuth,
  ApiError,
  ApiSuccess,
} from "../../common/decorators/swagger.decorator";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Controller("chat")
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  // Send message
  @ApiAuth(
    "Chat",
    "Send message to AI",
  )
  @ApiSuccess(
    "AI response generated successfully",
  )
  @ApiError(
    400,
    "Request limit exceeded or no active AI provider available",
  )
  @ApiError(
    404,
    "Conversation not found",
  )
  @Post()
  sendMessage(
    @Req() req: AuthenticatedRequest,
    @Body() data: SendMessageDto,
  ) {
    return this.chatService.sendMessage(
      req.user.id,
      data,
    );
  }

  // Get user's conversations
  @ApiAuth(
    "Chat",
    "Get user conversations",
  )
  @ApiSuccess(
    "Conversations retrieved successfully",
  )
  @Get("conversations")
  getConversations(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.chatService.getConversations(
      req.user.id,
    );
  }

  // Get conversation with messages
  @ApiAuth(
    "Chat",
    "Get conversation with messages",
  )
  @ApiSuccess(
    "Conversation retrieved successfully",
  )
  @ApiError(
    404,
    "Conversation not found",
  )
  @Get("conversations/:id")
  getConversation(
    @Req() req: AuthenticatedRequest,
    @Param("id") conversationId: string,
  ) {
    return this.chatService.getConversation(
      req.user.id,
      conversationId,
    );
  }

  // Delete conversation
  @ApiAuth(
    "Chat",
    "Delete conversation",
  )
  @ApiSuccess(
    "Conversation deleted successfully",
  )
  @ApiError(
    404,
    "Conversation not found",
  )
  @Delete("conversations/:id")
  deleteConversation(
    @Req() req: AuthenticatedRequest,
    @Param("id") conversationId: string,
  ) {
    return this.chatService.deleteConversation(
      req.user.id,
      conversationId,
    );
  }
}