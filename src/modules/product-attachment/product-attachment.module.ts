import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "../product/product.module";
import { TypeModule } from "../type/type.module";
import {
  ProductAttachment,
  ProductAttachmentSchema,
} from "./entities/product-attachment.entity";
import { ProductAttachmentController } from "./product-attachment.controller";
import { ProductAttachmentService } from "./product-attachment.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductAttachment.name, schema: ProductAttachmentSchema },
    ]),
    ProductModule,
    TypeModule,
  ],
  controllers: [ProductAttachmentController],
  providers: [ProductAttachmentService],
})
export class ProductAttachmentModule {}
