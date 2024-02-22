import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductAttachmentDocument = HydratedDocument<ProductAttachment>;
/**
 * 产品附件
 */
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class ProductAttachment {
  /**
   * 附件名称
   */
  @Prop({ required: true })
  name: string;
  /**
   * 附件所属的类型 id
   */
  @Prop({ required: true })
  productType_id: string;
  /**
   * 附件所属产品id
   */
  @Prop({ required: true })
  productList_id: string;
  /**
   * 附件下载地址
   */
  @Prop({ required: true })
  url: string;
  /**
   * 顺序(越大越靠前)
   */
  @Prop()
  order?: number;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}
export const ProductAttachmentSchema =
  SchemaFactory.createForClass(ProductAttachment);
