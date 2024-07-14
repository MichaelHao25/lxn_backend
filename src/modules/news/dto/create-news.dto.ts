import { IsArray, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateNewsDto {
  /**
   * 类型id
   */
  @IsString()
  @IsOptional()
  type?: string;
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
  mainPicture: string;
  /**
   * 产品描述
   */
  @IsString()
  description: string;
  /**
   * 产品详情
   */
  @IsString()
  details: string;
}
