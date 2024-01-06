import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SiteMessage, SiteMessageSchema } from "./entities/site-message.entity";
import { SiteMessageController } from "./site-message.controller";
import { SiteMessageService } from "./site-message.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SiteMessage.name, schema: SiteMessageSchema },
    ]),
  ],
  controllers: [SiteMessageController],
  providers: [SiteMessageService],
})
export class SiteMessageModule {}
