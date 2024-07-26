import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { PageConfig } from "src/dto/index.dto";
import {
  IAuthorizationInformation_property,
  IAuthorizationInformation_scope,
} from "../interface";

export class FindProductDto extends PageConfig {
  /**
   * 类型id
   */
  @IsOptional()
  type?: string[] | string;
  /**
   * 产品标题
   */
  @IsOptional()
  @IsString()
  title?: string;
  /**
   * 标签id
   */
  @IsOptional()
  label?: string[] | string;
  /**
   * 上线时间
   */
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  releaseDate?: Date;
  /**
   * 授权性质
   */
  @IsEnum(IAuthorizationInformation_property)
  @IsOptional()
  authorizationInformation_property?: IAuthorizationInformation_property;
  /**
   * 授权范围
   */
  @IsEnum(IAuthorizationInformation_scope)
  @IsOptional()
  authorizationInformation_scope?: IAuthorizationInformation_scope;
  /**
   * 顺序(越大越靠前)
   */
  @IsOptional()
  @Type(() => Number)
  order?: number;
}
