import {
  applyDecorators,
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

export function ApiAuth(
  tag: string,
  summary: string,
) {
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary,
    }),
  );
}

export function ApiPublic(
  tag: string,
  summary: string,
) {
  return applyDecorators(
    ApiTags(tag),
    ApiOperation({
      summary,
    }),
  );
}

export function ApiSuccess(
  description = "Request successful",
  status = 200,
) {
  return ApiResponse({
    status,
    description,
  });
}

export function ApiError(
  status: number,
  description: string,
) {
  return ApiResponse({
    status,
    description,
  });
}