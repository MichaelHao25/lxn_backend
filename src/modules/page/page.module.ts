import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "../product/product.module";
import { TypeModule } from "../type/type.module";
import { Page, PageSchema } from "./entities/page.entity";
import { PageController } from "./page.controller";
import { PageService } from "./page.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    TypeModule,
    forwardRef(() => ProductModule),
  ],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
