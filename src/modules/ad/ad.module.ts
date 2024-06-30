import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdController } from "./ad.controller";
import { AdService } from "./ad.service";
import { Ad, AdSchema } from "./entities/ad.entity";

/**
 * 广告模块
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }])],
  controllers: [AdController],
  providers: [AdService],
})
export class AdModule {}
