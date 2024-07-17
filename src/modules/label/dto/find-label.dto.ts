import { IsOptional, IsString } from "class-validator";
import { PageConfig } from "src/dto/index.dto";

export class FindLabelDto extends PageConfig {
  @IsString()
  @IsOptional()
  title: string;
}
