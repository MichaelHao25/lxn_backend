import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class Product {
  /**
   * 类型id
   */
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Type" })
  type: string;
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

export const ProductSchema = SchemaFactory.createForClass(Product);
