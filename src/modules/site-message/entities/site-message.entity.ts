import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SiteMessageDocument = HydratedDocument<SiteMessage>;
/**
 * 站点信息
 */
@Schema({
  timestamps: {
    updatedAt: "updateAt",
  },
})
export class SiteMessage {
  /**
   * 昵称
   */
  @Prop({ required: true })
  nickname: string;
  /**
   * 电话
   */
  @Prop({ required: true })
  tel: string;
  /**
   * 消息
   */
  @Prop({ required: true })
  message: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const SiteMessageSchema = SchemaFactory.createForClass(SiteMessage);
