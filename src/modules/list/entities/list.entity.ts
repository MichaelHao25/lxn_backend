import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IShopType } from "src/modules/order/entities/order.entity";

export type ListDocument = HydratedDocument<List>;
/**
 * 列表
 */
@Schema({
  timestamps: {
    createdAt: "createTime",
    updatedAt: "updateAt",
  },
})
export class List {
  /**
   * id 商品id
   */
  @Prop({ required: true })
  id: string;
  @Prop({ default: IShopType.TB, type: mongoose.Schema.Types.String })
  type: IShopType;
  /**
   * 商品的详情信息
   */
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  details: Record<string, any>;
  /**
   * 创建时间
   */
  @Prop({ default: Date.now })
  createTime: Date;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
