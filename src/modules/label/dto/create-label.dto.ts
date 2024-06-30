import { IsNotEmpty, IsString } from "class-validator";

export class CreateLabelDto {
  /**
   * 类型名称
   */
  @IsString()
  @IsNotEmpty()
  title: string;
}
