import { IsOptional, IsString } from "class-validator";
import { PageConfig } from "src/dto/index.dto";

export class FindNewsDto extends PageConfig {
  /**
   * 类型id
   */
  @IsOptional()
  @IsString()
  typeId?: string;
  /**
   * 产品标题
   */
  @IsOptional()
  @IsString()
  title?: string;
}
