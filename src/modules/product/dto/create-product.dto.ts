import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
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
  @IsOptional()
  type?: string[];
  /**
   * 产品标签
   */
  @IsArray()
  @IsOptional()
  label?: string[];
  /**
   * 产品标题
   */
  @IsString()
  title: string;
  /**
   * 产品主图
   */
  @IsUrl()
  @IsOptional()
  mainPictureUrl?: string;
  /**
   * 产品描述
   */
  @IsString()
  @IsOptional()
  description?: string;
  /**
   * 上线时间
   */
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  releaseDate_start?: Date;
  /**
   * 上线时间
   */
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  releaseDate_end?: Date;
  /**
   * 总集数
   */
  @IsString()
  @IsOptional()
  totalEpisodes?: string;
  /**
   * 时长
   */
  @IsString()
  @IsOptional()
  duration?: string;
  /**
   * 视频方向
   */
  @IsString()
  @IsOptional()
  videoDirection?: string;
  /**
   * 评级
   */
  @IsString()
  @IsOptional()
  level?: string;
  /**
   * 授权信息 - 授权性质
   */
  @IsString()
  @IsOptional()
  @IsEnum(IAuthorizationInformation_property)
  authorizationInformation_property?: IAuthorizationInformation_property;
  /**
   * 授权信息 -- 首发平台
   */
  @IsString()
  @IsOptional()
  authorizationInformation_firstLaunchPlatform?: string;
  /**
   * 授权信息 -- 范围
   */
  @IsString()
  @IsOptional()
  @IsEnum(IAuthorizationInformation_scope)
  authorizationInformation_scope?: IAuthorizationInformation_scope;
  /**
   * 授权信息 -- 变现方式
   */
  @IsString()
  @IsOptional()
  @IsEnum(IAuthorizationInformation_monetizationMethods)
  authorizationInformation_monetizationMethods?: IAuthorizationInformation_monetizationMethods;
  /**
   * 试看地址
   */
  @IsString()
  @IsOptional()
  pilotVideoAddress?: string;
  /**
   * 顺序(越大越靠前)
   */
  @IsOptional()
  @Type(() => Number)
  order?: number;
  /**
   * 游戏主题
   */
  @IsOptional()
  gameTheme?: string;
}
