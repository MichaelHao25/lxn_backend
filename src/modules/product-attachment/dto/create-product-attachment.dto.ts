import { IsString } from "class-validator";

export class CreateProductAttachmentDto {
  /**
   * 附件名称
   */
  @IsString()
  name: string;
  /**
   * 附件所属产品id
   */
  @IsString()
  productItem_id: string;
  /**
   * 附件下载地址
   */
  @IsString()
  url: string;
}
