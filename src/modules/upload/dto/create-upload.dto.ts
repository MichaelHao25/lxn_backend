import { IsString } from "class-validator";

export class CreateUploadDto {
  @IsString()
  fileName: string;
  @IsString()
  fileExt: string;
  @IsString()
  fileLocation: string;
  @IsString()
  mimetype: string;
}
