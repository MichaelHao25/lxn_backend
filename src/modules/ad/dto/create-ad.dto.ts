import {
  IsEnum,
  isHexColor,
  IsNotEmpty,
  IsOptional,
  isRgbColor,
  IsString,
  Validate,
} from "class-validator";
import { IAdType } from "../interface";

export class CreateAdDto {
  /**
   * 类型
   */
  @IsEnum(IAdType)
  @IsNotEmpty()
  type: IAdType;
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
  /**
   * 背景颜色 只能是
   */
  @Validate((backgroundColor) => {
    if (isHexColor(backgroundColor) || isRgbColor(backgroundColor)) {
      return true;
    }
  })
  @IsOptional()
  backgroundColor?: string;
}
