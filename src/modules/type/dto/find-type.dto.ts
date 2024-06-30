import { IsEnum, IsOptional } from "class-validator";
import { PageConfig } from "src/dto/index.dto";

/**
 * 产品一级分类
 */
export enum IProductOneLevelType {
  /**
   * 产品
   */
  product = "product",
  /**
   * 新闻
   */
  news = "news",
}
export class FindTypeDto extends PageConfig {
  /**
   * 一级分类的名称
   */
  @IsOptional()
  @IsEnum(IProductOneLevelType)
  type?: IProductOneLevelType;
}
