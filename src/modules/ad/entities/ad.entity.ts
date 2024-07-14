import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IAdType } from "../interface";
export type AdDocument = HydratedDocument<Ad>;

@Schema({
  timestamps: {
    updatedAt: "updateAt",
  },
})
export class Ad {
  /**
   * 类型
   */
  @Prop({ required: true })
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
  url: string;
  /**
   * 颜色
   */
  @Prop()
  backgroundColor?: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
