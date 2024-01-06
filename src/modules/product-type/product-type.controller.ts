import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import parseResponse, { IResponseStructure } from "src/common/parseResponse";
import { CreateProductTypeDto } from "./dto/create-type.dto";
import { UpdateProductTypeDto } from "./dto/update-type.dto";
import { ProductTypeService } from "./product-type.service";

@Controller("product-type")
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  async create(@Body() createProductTypeDto: CreateProductTypeDto) {
    const res = await this.productTypeService.create(createProductTypeDto);
    return parseResponse({ data: res._id, message: "创建成功！" });
  }

  @Get()
  findAll() {
    return this.productTypeService.findAll();
  }

  @Get(":_id")
  findOne(@Param("_id") _id: string) {
    return this.productTypeService.findOne(_id);
  }

  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateProduceTypeDto: UpdateProductTypeDto
  ) {
    return await this.productTypeService.update(_id, updateProduceTypeDto);
  }

  @Delete(":_id")
  async remove(@Param("_id") _id: string): Promise<IResponseStructure<string>> {
    return await this.productTypeService.remove(_id);
  }
}
