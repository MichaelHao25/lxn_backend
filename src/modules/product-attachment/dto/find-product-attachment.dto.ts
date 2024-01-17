import { IsOptional, IsString } from "class-validator";
import { PageConfig } from "src/dto/index.dto";

export class FindProductAttachmentDto extends PageConfig {
  /**
   * 附件名称
   */
  @IsOptional()
  @IsString()
  name?: string;
  /**
   * 所属类型 id
   */
  @IsOptional()
  @IsString()
  typeId?: string;
}
