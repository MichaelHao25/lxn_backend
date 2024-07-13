import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

export class CreateProductDto {
  /**
   * 类型id
   */
  @IsString()
  type: string;
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
   * banner 图
   */
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayNotEmpty()
  banner: string[];
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
  /**
   * 顺序(越大越靠前)
   */
  @IsNumber()
  @IsOptional()
  order?: number;
}
