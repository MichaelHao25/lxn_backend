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
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
  })
  type: Type[];
  /**
   * 产品标签
   */
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  })
  label: Label[];
  /**
   * 产品主图
   */
  @Prop({ required: true })
  mainPictureUrl: string;
  /**
   * 产品描述
   */
  @Prop({ required: true })
  description: string;
  /**
   * 上线时间
   */
  @Prop({ required: true, type: Date })
  releaseDate_start: Date;
  @Prop({ required: true, type: Date })
  releaseDate_end: Date;
  /**
   * 总集数
   */
  @Prop({ required: false })
  totalEpisodes: number;
  /**
   * 时长
   */
  @Prop({ required: false })
  duration: number;
  /**
   * 视频方向
   */
  @Prop({ required: false })
  videoDirection: string;

  /**
   * 授权信息 - 授权性质
   */
  @Prop({ required: true })
  authorizationInformation_property: IAuthorizationInformation_property;

  /**
   * 授权信息 -- 首发平台
   */
  @Prop({ required: true })
  authorizationInformation_firstLaunchPlatform: number;

  /**
   * 授权信息 -- 范围
   */
  @Prop({ required: true })
  authorizationInformation_scope: IAuthorizationInformation_scope;

  /**
   * 授权信息 -- 变现方式
   */
  @Prop({ required: true })
  authorizationInformation_monetizationMethods: IAuthorizationInformation_monetizationMethods;
  /**
   * 试看地址
   */
  @Prop({ required: true })
  pilotVideoAddress: string;
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

export const ProductSchema = SchemaFactory.createForClass(Product);
