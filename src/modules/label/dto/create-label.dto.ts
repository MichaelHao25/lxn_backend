import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLabelDto {
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
