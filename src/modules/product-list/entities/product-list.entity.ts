import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductListDocument = HydratedDocument<ProductList>;
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class ProductList {
  /**
   * 类型id
   */
  @Prop({ required: true })
  typeId: string;
  /**
   * 产品标题
   */
  @Prop({ required: true })
  title: string;
  /**
   * 产品主图
   */
  @Prop({ required: true })
  mainPicture: string;
  /**
   * banner 图
   */
  @Prop({ required: true })
  banner: string[];
  /**
   * 产品描述
   */
  @Prop({ required: true })
  description: string;
  /**
   * 产品详情
   */
  @Prop({ required: true })
  details: string;
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

export const ProductListSchema = SchemaFactory.createForClass(ProductList);
