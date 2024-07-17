import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LabelModule } from "../label/label.module";
import { AdModule } from "./../ad/ad.module";
import { BannerModule } from "./../banner/banner.module";
import { NewsModule } from "./../news/news.module";
import { ProductModule } from "./../product/product.module";
import { Page, PageSchema } from "./entities/page.entity";
import { PageController } from "./page.controller";
import { PageService } from "./page.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    BannerModule,
    AdModule,
    BannerModule,
    ProductModule,
    NewsModule,
    LabelModule,
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
