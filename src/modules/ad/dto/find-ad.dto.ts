import { IsEnum, IsOptional } from "class-validator";
import { PageConfig } from "src/dto/index.dto";
import { IAdType } from "../interface";

export class FindAdDto extends PageConfig {
  /**
   * Ad 类型
   */
  @IsEnum(IAdType)
  @IsOptional()
  type?: IAdType;
}
