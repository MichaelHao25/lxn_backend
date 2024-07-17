import { IsEnum, IsOptional } from "class-validator";
import { PageConfig } from "src/dto/index.dto";
import { IBannerType } from "../interface";

export class FindBannerDto extends PageConfig {
  @IsEnum(IBannerType)
  @IsOptional()
  type?: IBannerType;
}
