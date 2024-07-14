import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LabelDocument = HydratedDocument<Label>;
/**
 * 类型管理
 */
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class Label {
  /**
   * 标题
   */
  @Prop({ required: true, unique: true })
  title: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
