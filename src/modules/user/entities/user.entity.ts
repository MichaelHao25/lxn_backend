import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;
/**
 * 用户列表
 */
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class User {
  /**
   * 用户名
   */
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  username: string;
  /**
   * 密码
   */
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  password: string;
  /**
   * 当前用户是否被禁用
   */
  @Prop({ default: false })
  isDisable: boolean;
  /**
   * 是否是管理员
   */
  @Prop({ default: false })
  isAdmin: boolean;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
