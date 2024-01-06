import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductTypeModule } from "../product-type/product-type.module";
import { ProductList, ProductListSchema } from "./entities/product-list.entity";
import { ProductListController } from "./product-list.controller";
import { ProductListService } from "./product-list.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductList.name, schema: ProductListSchema },
    ]),
    ProductTypeModule,
  ],
  controllers: [ProductListController],
  providers: [ProductListService],
})
export class ProductListModule {}
