import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Label } from "src/modules/label/entities/label.entity";
import { Type } from "src/modules/type/entities/type.entity";
import {
  IAuthorizationInformation_monetizationMethods,
  IAuthorizationInformation_property,
  IAuthorizationInformation_scope,
} from "../interface";
export type ProductDocument = HydratedDocument<Product>;
@Schema({
  timestamps: {
    updatedAt: "updatedAt",
  },
})
export class Product {
  /**
   * 产品标题
   */
  @Prop({ required: true })
  title: string;
  /**
   * 类型id
   */
  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
  })
  type: Type[];
  /**
   * 产品标签
   */
  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  })
  label: Label[];
  /**
   * 产品主图
   */
  @Prop({ required: false })
  mainPictureUrl: string;
  /**
   * 产品描述
   */
  @Prop({ required: false })
  description: string;
  /**
   * 上线时间
   */
  @Prop({ required: false, type: Date })
  releaseDate_start: Date;
  @Prop({ required: false, type: Date })
  releaseDate_end: Date;
  /**
   * 总集数
   */
  @Prop({ required: false })
  totalEpisodes: string;
  /**
   * 时长
   */
  @Prop({ required: false })
  duration: string;
  /**
   * 视频方向
   */
  @Prop({ required: false })
  videoDirection: string;

  /**
   * 授权信息 - 授权性质
   */
  @Prop({ required: false })
  authorizationInformation_property: IAuthorizationInformation_property;

  /**
   * 授权信息 -- 首发平台
   */
  @Prop({ required: false })
  authorizationInformation_firstLaunchPlatform: string;

  /**
   * 授权信息 -- 范围
   */
  @Prop({ required: false })
  authorizationInformation_scope: IAuthorizationInformation_scope;

  /**
   * 授权信息 -- 变现方式
   */
  @Prop({ required: false })
  authorizationInformation_monetizationMethods: IAuthorizationInformation_monetizationMethods;
  /**
   * 试看地址
   */
  @Prop({ required: false })
  pilotVideoAddress: string;
  /**
   * 评级
   */
  @Prop({ required: false })
  level: string;
  /**
   * 顺序(越大越靠前)
   */
  @Prop()
  order?: number;
  /**
   * 游戏主题
   */
  @Prop({ required: false })
  gameTheme: string;
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
