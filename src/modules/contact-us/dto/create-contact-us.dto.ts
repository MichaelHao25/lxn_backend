import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class CreateContactUsDto {
  @IsString()
  @IsNotEmpty()
  origin: string;
  @IsString()
  @IsNotEmpty()
  company: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsMobilePhone("zh-CN")
  @IsNotEmpty()
  tel: string;
  @IsString()
  understandType: string;
  @IsString()
  scopeOfAuthority: string;
}
