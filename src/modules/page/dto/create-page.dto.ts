import { IsArray, IsNotEmpty } from "class-validator";

export class CreatePageDto {
  @IsArray()
  @IsNotEmpty()
  indexShowLabel: string[];
}
