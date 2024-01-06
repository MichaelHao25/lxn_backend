import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class CreateSiteMessageDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;
  @IsMobilePhone("zh-CN")
  @IsNotEmpty()
  tel: string;
  @IsString()
  @IsNotEmpty()
  message: string;
}
