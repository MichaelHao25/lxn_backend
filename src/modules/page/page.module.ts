import { Module } from "@nestjs/common";
import { AdModule } from "./../ad/ad.module";
import { BannerModule } from "./../banner/banner.module";
import { NewsModule } from "./../news/news.module";
import { ProductModule } from "./../product/product.module";
import { PageController } from "./page.controller";
import { PageService } from "./page.service";

@Module({
  imports: [BannerModule, AdModule, BannerModule, ProductModule, NewsModule],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
