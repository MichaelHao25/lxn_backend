import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IAdType } from "../interface";
export type AdDocument = HydratedDocument<Ad>;
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class Ad {
  /**
   * 类型
   */
  @Prop({ required: true, unique: true })
  type: IAdType;
  /**
   * 标题
   */
  @Prop({ required: true })
  title: string;
  /**
   * 描述
   */
  @Prop({ required: true })
  description: string;
  /**
   * url
   */
  @Prop({ required: true })
  pictureUrl: string;
  /**
   * 跳转地址
   */
  @Prop({ required: true })
  gotoUrl: string;
  /**
   * 颜色
   */
  @Prop()
  backgroundColor: string;
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

export const AdSchema = SchemaFactory.createForClass(Ad);
