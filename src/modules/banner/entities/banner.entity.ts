import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BannerDocument = HydratedDocument<Banner>;

class BannerItem {
  @Prop({ required: true })
  title?: string;
  @Prop({ required: true })
  description?: string;
  @Prop({ required: true })
  url: string;
}

@Schema({
  timestamps: {
    updatedAt: "updateAt",
  },
})
export class Banner {
  /**
   * 类型
   */
  @Prop({ required: true })
  type: string;
  /**
   * 列表
   */
  @Prop({ type: [BannerItem], default: [] })
  list: BannerItem[];
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
