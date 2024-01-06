import { PartialType } from "@nestjs/swagger";
import { CreateProductTypeDto } from "./create-type.dto";

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {}
