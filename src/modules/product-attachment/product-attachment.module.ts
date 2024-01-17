import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductListModule } from "../product-list/product-list.module";
import { ProductTypeModule } from "../product-type/product-type.module";
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
    ProductListModule,
    ProductTypeModule,
  ],
  controllers: [ProductAttachmentController],
  providers: [ProductAttachmentService],
})
export class ProductAttachmentModule {}
