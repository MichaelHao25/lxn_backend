import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AttributesItem } from "src/dto/index.dto";

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
   * 附加属性
   */
  @Prop({
    type: [AttributesItem],
    default: [],
  })
  appendAttributes: AttributesItem[];
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
