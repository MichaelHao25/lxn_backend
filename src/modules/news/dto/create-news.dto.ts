import { IsString, IsUrl } from "class-validator";

export class CreateNewsDto {
  /**
   * 类型id
   */
  @IsString()
  typeId: string;
  /**
   * 产品标题
   */
  @IsString()
  title: string;
  /**
   * 产品主图
   */
  @IsUrl()
  mainPicture: string;
  /**
   * 详情首页上的图片
   */
  @IsString()
  detailsPicture: string;
  /**
   * 产品描述
   */
  @IsString()
  description: string;
  /**
   * 产品详情
   */
  @IsString()
  details: string;
}
