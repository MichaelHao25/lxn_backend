import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { TypeDocument } from "src/modules/type/entities/type.entity";

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
  /**
   * 首页数据的顺序
   */
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
  })
  indexShowType: TypeDocument[];
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
