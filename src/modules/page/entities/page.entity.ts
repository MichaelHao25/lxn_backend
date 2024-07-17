import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { LabelDocument } from "src/modules/label/entities/label.entity";

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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  })
  indexShowLabel: LabelDocument[];
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
