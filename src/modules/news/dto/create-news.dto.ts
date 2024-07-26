import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateNewsDto {
  /**
   * 类型id
   */
  @IsString()
  @IsOptional()
  type?: string;
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
   * 产品详情
   */
  @IsString()
  @IsOptional()
  details?: string;
  /**
   * 顺序(越大越靠前)
   */
  @IsOptional()
  @Type(() => Number)
  order?: number;
}
