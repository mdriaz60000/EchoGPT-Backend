import { Module } from "@nestjs/common";

import { ProvidersModule } from "../providers/providers.module";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { UsageLogsModule } from "../usageLogs/usageLogs.module";

@Module({
  imports: [
    ProvidersModule,
       UsageLogsModule,
  ],
  controllers: [
    ChatController,
  ],
  providers: [
    ChatService,
  ],
})
export class ChatModule {}