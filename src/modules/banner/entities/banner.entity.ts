import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
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
    updatedAt: "updateAt",
  },
})
export class Banner {
  /**
   * 类型
   */
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  type: IBannerType;
  @IsString()
  @IsOptional()
  @Prop({ required: true })
  title?: string;
  @IsString()
  @IsOptional()
  @Prop({ required: true })
  description?: string;
  @IsUrl()
  @Prop({ required: true })
  url: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
