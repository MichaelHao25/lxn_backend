import { IsOptional, IsString } from "class-validator";
import { PageConfig } from "src/dto";

export class FindProductListDto extends PageConfig {
  /**
   * 类型id
   */
  @IsOptional()
  @IsString()
  typeName: string;
  /**
   * 产品标题
   */
  @IsOptional()
  @IsString()
  title: string;
}
