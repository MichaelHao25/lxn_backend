import { IsEnum, IsOptional } from "class-validator";

/**
 * 产品一级分类
 */
export enum ProductOneLevelType {
  product = "product",
  news = "news",
}
export class FindProductTypeDto {
  /**
   * 一级分类的名称
   */
  @IsOptional()
  @IsEnum(ProductOneLevelType)
  type?: ProductOneLevelType;
}
