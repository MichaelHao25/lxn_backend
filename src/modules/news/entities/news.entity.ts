import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
   * 详情首页上的图片
   */
  @Prop({ required: true })
  detailsPicture: string;
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
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);
