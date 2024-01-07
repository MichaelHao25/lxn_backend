import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import parseResponse from "src/common/parseSuccessResponse";
import { IResponseStructure } from "src/utils/interface";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { UpdateProductTypeDto } from "./dto/update-product-type.dto";
import { ProductTypeService } from "./product-type.service";

@Controller("product-type")
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}
  /**
   * 创建一个新的类型
   * @param createProductTypeDto
   * @returns
   */
  @Post()
  async create(@Body() createProductTypeDto: CreateProductTypeDto) {
    const res = await this.productTypeService.create(createProductTypeDto);
    return parseResponse({ data: res });
  }
  /**
   * 查找类型
   * @param params
   * @returns
   */
  @Get()
  findAll(@Query("type") type: IFindAll["type"]) {
    if (["product", "news"].includes(type)) {
      return this.productTypeService.findAll({ type });
    }
    return this.productTypeService.findAll();
  }
  /**
   * 根据 id 获取单个类型
   * @param _id
   * @returns
   */
  @Get(":_id")
  findOne(@Param("_id") _id: string) {
    return this.productTypeService.findOne(_id);
  }
  /**
   * 根据 id 更新类型
   * @param _id
   * @returns
   */
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateProduceTypeDto: UpdateProductTypeDto
  ) {
    return await this.productTypeService.update(_id, updateProduceTypeDto);
  }
  /**
   * 根据 id 删除类型
   * @param _id
   * @returns
   */
  @Delete(":_id")
  async remove(@Param("_id") _id: string): Promise<IResponseStructure<string>> {
    return await this.productTypeService.remove(_id);
  }
}
