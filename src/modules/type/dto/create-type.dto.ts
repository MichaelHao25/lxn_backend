import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateTypeDto {
  /**
   * 父级id(如果为空的话就是一级分类)
   */
  @IsOptional()
  @IsString()
  parent?: ObjectId;
  /**
   * 类型名称
   */
  @IsString()
  @IsNotEmpty()
  title: string;
}
