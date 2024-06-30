import {
  IsArray,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { AttributesItem } from "src/dto/index.dto";

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
  @IsArray()
  @IsOptional()
  appendAttributes?: AttributesItem[];
}
