import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { TypeDocument } from "src/modules/type/entities/type.entity";
import { IGlobalConfig } from "../interface";

export type PageDocument = HydratedDocument<Page>;
/**
 * 类型管理
 */
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class Page {
  @Prop()
  type?: IGlobalConfig;
  /**
   * 首页数据的顺序
   */
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
  })
  indexShowType?: TypeDocument[];
  /**
   * 默认的产品信息图片
   */
  @Prop()
  defaultProductImage?: string;
  /**
   * 默认的新闻信息图片
   */
  @Prop()
  defaultNewImage?: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
