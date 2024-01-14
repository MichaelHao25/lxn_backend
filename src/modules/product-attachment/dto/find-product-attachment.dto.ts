import { IsOptional, IsString } from "class-validator";
import { PageConfig } from "src/dto";

export class FindProductAttachmentDto extends PageConfig {
  /**
   * 附件名称
   */
  @IsOptional()
  @IsString()
  name: string;
  /**
   * 所属类型
   */
  @IsOptional()
  @IsString()
  typeName: string;
}
