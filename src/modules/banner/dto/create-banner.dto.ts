import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { IBannerType } from "../interface";

export class CreateBannerDto {
  /**
   * 类型
   */
  @IsEnum(IBannerType)
  @IsNotEmpty()
  type: IBannerType;
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsUrl()
  pictureUrl: string;
  @IsUrl()
  gotoUrl: string;
}
