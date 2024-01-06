import { PartialType } from "@nestjs/mapped-types";
import { CreateProductTypeDto } from "./create-type.dto";

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {}
