import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTypeDto {
  /**
   * 父级id(如果为空的话就是一级分类)
   */
  @IsOptional()
  @IsString()
  parent?: string;
  /**
   * 类型名称
   */
  @IsString()
  @IsNotEmpty()
  title: string;
  /**
   * 顺序(越大越靠前)
   */
  @IsOptional()
  @Type(() => Number)
  order?: number;
}
