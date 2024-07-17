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

  /**
   * 公司名称
   */
  @IsOptional()
  @IsString()
  companyName?: string;

  /**
   * 姓名
   */
  @IsOptional()
  @IsString()
  name?: string;
  /**
   * 电话
   */
  @IsOptional()
  @IsString()
  tel?: string;
}
