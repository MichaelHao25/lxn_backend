import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LabelModule } from "../label/label.module";
import { TypeModule } from "../type/type.module";
import { Product, ProductSchema } from "./entities/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    TypeModule,
    LabelModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
