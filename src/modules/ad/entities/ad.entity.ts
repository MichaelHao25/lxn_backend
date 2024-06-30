import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
  type: string;
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
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
