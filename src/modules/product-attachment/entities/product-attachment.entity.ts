import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductAttachmentDocument = HydratedDocument<ProductAttachment>;
/**
 * 产品附件
 */
export class ProductAttachment {
  /**
   * 附件名称
   */
  @Prop({ required: true })
  name: string;
  /**
   * 附件所属产品id
   */
  @Prop({ required: true })
  productItem_id: string;
  /**
   * 附件下载地址
   */
  @Prop({ required: true })
  url: string;
}
export const ProductAttachmentSchema =
  SchemaFactory.createForClass(ProductAttachment);
