import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactUsDto {
  @IsString()
  @IsNotEmpty()
  origin: string;
  @IsString()
  @IsNotEmpty()
  companyName: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  tel: string;
  @IsString()
  understandType: string;
  @IsString()
  scopeOfAuthority: string;
}
