import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

export enum ChatProvider {
  OPENAI = "OPENAI",
  ANTHROPIC = "ANTHROPIC",
  GEMINI = "GEMINI",
}

export class SendMessageDto {
  @ApiProperty({
    example: "Explain REST API in simple terms",
    description: "Message sent to the AI",
  })
  @IsString()
  @MinLength(1)
  message: string;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Existing conversation ID",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  conversationId?: string;

  @ApiProperty({
    enum: ChatProvider,
    example: ChatProvider.OPENAI,
    required: false,
    description:
      "AI provider. If omitted, the default provider is used.",
  })
  @IsOptional()
  @IsEnum(ChatProvider)
  provider?: ChatProvider;
}