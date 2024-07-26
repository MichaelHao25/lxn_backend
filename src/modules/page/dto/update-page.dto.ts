import { PartialType } from "@nestjs/mapped-types";
import { OmitType } from "@nestjs/swagger";
import { CreatePageDto } from "./create-page.dto";

export class UpdatePageDto extends PartialType(
  OmitType(CreatePageDto, ["type"])
) {}
