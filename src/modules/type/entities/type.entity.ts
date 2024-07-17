import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type TypeDocument = HydratedDocument<Type>;
/**
 * 类型管理
 */
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class Type {
  /**
   * 标题
   */
  @Prop({ required: true, unique: true })
  title: string;
  /**
   * 父类型名称(_id)
   */
  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
  })
  parent?: TypeDocument;
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
export const TypeSchema = SchemaFactory.createForClass(Type);
