import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import {
  IAuthorizationInformation_monetizationMethods,
  IAuthorizationInformation_property,
  IAuthorizationInformation_scope,
} from "../interface";

export class CreateProductDto {
  /**
   * 类型id
   */
  @IsArray()
  type: string[];
  /**
   * 产品标签
   */
  @IsArray()
  label: string[];
  /**
   * 产品标题
   */
  @IsString()
  title: string;
  /**
   * 产品主图
   */
  @IsUrl()
  mainPictureUrl: string;
  /**
   * 产品描述
   */
  @IsString()
  description: string;
  /**
   * 上线时间
   */
  @IsDate()
  @Type(() => Date)
  releaseDate_start: Date;
  /**
   * 上线时间
   */
  @IsDate()
  @Type(() => Date)
  releaseDate_end: Date;
  /**
   * 总集数
   */
  @IsNumber()
  @IsOptional()
  totalEpisodes?: number;
  /**
   * 时长
   */
  @IsNumber()
  @IsOptional()
  duration?: number;
  /**
   * 视频方向
   */
  @IsString()
  @IsOptional()
  videoDirection?: string;
  /**
   * 授权信息 - 授权性质
   */
  @IsString()
  @IsEnum(IAuthorizationInformation_property)
  authorizationInformation_property: IAuthorizationInformation_property;
  /**
   * 授权信息 -- 首发平台
   */
  @IsNumber()
  authorizationInformation_firstLaunchPlatform: number;
  /**
   * 授权信息 -- 范围
   */
  @IsString()
  @IsEnum(IAuthorizationInformation_scope)
  authorizationInformation_scope: IAuthorizationInformation_scope;
  /**
   * 授权信息 -- 变现方式
   */
  @IsString()
  @IsEnum(IAuthorizationInformation_monetizationMethods)
  authorizationInformation_monetizationMethods: IAuthorizationInformation_monetizationMethods;
  /**
   * 试看地址
   */
  @IsString()
  pilotVideoAddress: string;
  /**
   * 顺序(越大越靠前)
   */
  @IsNumber()
  @IsOptional()
  order?: number;
}
