import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BannerController } from "./banner.controller";
import { BannerService } from "./banner.service";
import { Banner, BannerSchema } from "./entities/banner.entity";

/**
 * banner模块
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
