import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IBannerType } from "../interface";

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
    updatedAt: "updatedAt",
  },
})
export class Banner {
  /**
   * 类型
   */

  @Prop({ required: true })
  type: IBannerType;

  @Prop({ required: false })
  title?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  pictureUrl: string;

  @Prop({ required: true })
  gotoUrl: string;
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

export const BannerSchema = SchemaFactory.createForClass(Banner);
