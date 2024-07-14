import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ContactUsDocument = HydratedDocument<ContactUs>;
/**
 * 联系我们
 */
@Schema({
  timestamps: {
    updatedAt: "updateAt",
  },
})
export class ContactUs {
  /**
   * 来源
   */
  @Prop({ required: true })
  origin: string;
  /**
   * 公司名称
   */
  @Prop({ required: true })
  company: string;
  /**
   * 姓名
   */
  @Prop({ required: true })
  name: string;
  /**
   * 电话
   */
  @Prop({ required: true })
  tel: string;
  /**
   * 了解类型
   */
  @Prop({ required: true })
  understandType: string;
  /**
   * 授权范围
   */
  @Prop({ required: true })
  scopeOfAuthority: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
