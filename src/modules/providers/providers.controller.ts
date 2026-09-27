import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

;
import { ProvidersService } from "./providers.service";
import { JwtAuthGuard } from "../auth/guards/jwtAuthGuards";
import { CreateProviderDto } from "./dto/createProvider.dto";
import { UpdateProviderDto } from "./dto/updateProvider.dto";
import { RolesGuard } from "../../common/guards/roles.guards";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../generated/prisma/enums";
import { ApiAuth, ApiError, ApiSuccess } from "../../common/decorators/swagger.decorator";

@Controller("providers")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class ProvidersController {
  constructor(
    private readonly providersService: ProvidersService,
  ) {}


   @ApiAuth(
    "Providers",
    "Create AI provider",
  )
  @ApiSuccess(
    "AI provider created successfully",
    201,
  )
  @ApiError(
    400,
    "Provider already exists",
  )
  @Post()
  create(@Body() data: CreateProviderDto) {
    return this.providersService.create(data);
  }


    @ApiAuth(
    "Providers",
    "Get all AI providers",
  )
  @ApiSuccess(
    "AI providers retrieved successfully",
  )
  @Get()
  findAll() {
    return this.providersService.findAll();
  }


    @ApiAuth(
    "Providers",
    "Get AI provider by ID",
  )
  @ApiSuccess(
    "AI provider retrieved successfully",
  )
  @ApiError(
    404,
    "AI provider not found",
  )
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }


    @ApiAuth(
    "Providers",
    "Update AI provider",
  )
  @ApiSuccess(
    "AI provider updated successfully",
  )
  @ApiError(
    404,
    "AI provider not found",
  )
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() data: UpdateProviderDto,
  ) {
    return this.providersService.update(id, data);
  }


    @ApiAuth(
    "Providers",
    "Delete AI provider",
  )
  @ApiSuccess(
    "AI provider deleted successfully",
  )
  @ApiError(
    404,
    "AI provider not found",
  )
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }

    @ApiAuth(
    "Providers",
    "Enable or disable AI provider",
  )
  @ApiSuccess(
    "AI provider status updated successfully",
  )
  @ApiError(
    404,
    "AI provider not found",
  )
  @Patch(":id/toggle")
  toggle(@Param("id") id: string) {
    return this.providersService.toggle(id);
  }


    @ApiAuth(
    "Providers",
    "Set AI provider as default",
  )
  @ApiSuccess(
    "AI provider set as default successfully",
  )
  @ApiError(
    404,
    "AI provider not found",
  )
  @Patch(":id/default")
  setDefault(@Param("id") id: string) {
    return this.providersService.setDefault(id);
  }
}