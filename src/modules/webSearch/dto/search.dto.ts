import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MinLength,
} from "class-validator";

export class SearchDto {
  @ApiProperty({
    example: "latest NestJS documentation",
    description: "Search query",
  })
  @IsString()
  @MinLength(2)
  query: string;
}