import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductTypeDocument = HydratedDocument<ProductType>;
/**
 * 类型管理
 */
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class ProductType {
  /**
   * 类型名称
   */
  @Prop({ required: true })
  typeName: string;
  /**
   * 父类型名称(_id)
   */
  @Prop({ required: false, default: "" })
  parent: string;
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

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
