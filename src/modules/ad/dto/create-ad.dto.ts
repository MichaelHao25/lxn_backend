import {
  IsEnum,
  isHexColor,
  IsNotEmpty,
  IsOptional,
  isRgbColor,
  IsString,
  IsUrl,
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
  title: string;
  /**
   * 描述
   */
  @IsString()
  description: string;
  /**
   * 图片地址
   */
  @IsNotEmpty()
  @IsUrl()
  pictureUrl: string;
  /**
   * 跳转地址
   */
  @IsString()
  @IsUrl()
  gotoUrl: string;
  /**
   * 背景颜色 只能是
   */
  @Validate((backgroundColor) => {
    if (isHexColor(backgroundColor) || isRgbColor(backgroundColor)) {
      return true;
    }
  })
  @IsOptional()
  backgroundColor: string;
}
