import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UploadDocument = HydratedDocument<Upload>;

@Schema({
  timestamps: {
    updatedAt: "updateAt",
  },
})
export class Upload {
  /**
   * 文件名称
   */
  @Prop({ required: true })
  fileName: string;
  /**
   * 文件后缀
   */
  @Prop({ required: true })
  fileExt: string;
  /**
   * 文件路径
   */
  @Prop({ required: true })
  fileLocation: string;
  /**
   * 文件类型
   */
  @Prop({ required: true })
  mimetype: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
