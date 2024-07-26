import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Label } from "src/modules/label/entities/label.entity";
import { Type } from "src/modules/type/entities/type.entity";

export type NewsDocument = HydratedDocument<News>;
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class News {
  /**
   * 类型id
   */
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: "Type" })
  type?: Type;
  /**
   * 产品标签
   */
  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  })
  label: Label[];
  /**
   * 产品标题
   */
  @Prop({ required: true })
  title: string;
  /**
   * 产品主图
   */
  @Prop({ required: false })
  mainPictureUrl: string;
  /**
   * 产品描述
   */
  @Prop({ required: false })
  description: string;
  /**
   * 产品详情
   */
  @Prop({ required: false })
  details: string;
  @Prop()
  order?: number;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);
