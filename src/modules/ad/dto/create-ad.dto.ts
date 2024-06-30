import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdDto {
  /**
   * 类型
   */
  @IsString()
  @IsNotEmpty()
  type: string;
  /**
   * 标题
   */
  @IsString()
  @IsNotEmpty()
  title: string;
  /**
   * 描述
   */
  @IsString()
  @IsNotEmpty()
  description: string;
  /**
   * url
   */
  @IsString()
  @IsNotEmpty()
  url: string;
}
