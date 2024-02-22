import { IsNumber, IsOptional, IsString } from "class-validator";

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
  productList_id: string;
  /**
   * 附件下载地址
   */
  @IsString()
  url: string;
  /**
   * 顺序(越大越靠前)
   */
  @IsNumber()
  @IsOptional()
  order?: number;
}
