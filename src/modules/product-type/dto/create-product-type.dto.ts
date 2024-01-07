import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductTypeDto {
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
  typeName: string;
}
