import { IsOptional, IsString } from "class-validator";
import { PageConfig } from "src/dto/index.dto";

export class FindContactUsDto extends PageConfig {
  /**
   * id
   */
  @IsOptional()
  @IsString()
  _id?: string;
  /**
   * 来源
   */
  @IsOptional()
  @IsString()
  origin?: string;
}
