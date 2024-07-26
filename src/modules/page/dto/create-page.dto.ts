import { IsArray, IsEnum, IsOptional, IsUrl } from "class-validator";
import { IGlobalConfig } from "../interface";

export class CreatePageDto {
  @IsEnum(IGlobalConfig)
  type: IGlobalConfig;
  @IsArray()
  @IsOptional()
  indexShowType?: string[];
  @IsUrl()
  @IsOptional()
  defaultProductImage?: string;
  @IsUrl()
  @IsOptional()
  defaultNewImage?: string;
}
