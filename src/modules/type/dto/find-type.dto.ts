import { IsOptional, IsString } from "class-validator";
import { PageConfig } from "src/dto/index.dto";

export class FindTypeDto extends PageConfig {
  /**
   * 一级分类的名称
   */
  @IsOptional()
  @IsString()
  type?: string;
}
