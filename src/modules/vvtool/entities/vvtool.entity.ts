import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type VvtoolDocument = HydratedDocument<Vvtool>;
/**
 * token 信息
 */
@Schema({
  timestamps: {
    updatedAt: "updateAt",
  },
})
export class Vvtool {
  /**
   * 最新的token
   */
  @Prop({ required: true, unique: true })
  accessToken: string;
  /**
   * 有效时间，单位秒
   */
  @Prop()
  expiresIn: number;
  /**
   * 令牌类型
   */
  @Prop()
  tokenType: string;
  /**
   * 权限
   */
  @Prop()
  scope: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const VvtoolSchema = SchemaFactory.createForClass(Vvtool);
