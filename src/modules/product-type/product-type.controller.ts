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
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { IResponseStructure } from "src/utils/interface";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { FindProductTypeDto } from "./dto/find-product-type.dto";
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
    return parseSuccessResponse({ data: res });
  }
  /**
   * 查找类型
   * @param params
   * @returns
   */
  @Get()
  async findAll(
    @Query() query: FindProductTypeDto
  ): Promise<IResponseStructure> {
    const { type } = query;
    if (["product", "news"].includes(type)) {
      const res = await this.productTypeService.findAll({ type });
      return parseSuccessResponse({ data: res });
    }
    const res = await this.productTypeService.findAll();
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 获取单个类型
   * @param _id
   * @returns
   */
  @Get(":_id")
  async findOne(@Param("_id") _id: string) {
    const res = await this.productTypeService.findOne(_id);
    return parseSuccessResponse({ data: res });
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
    const res = await this.productTypeService.update(_id, updateProduceTypeDto);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 删除类型
   * @param _id
   * @returns
   */
  @Delete(":_id")
  async remove(@Param("_id") _id: string): Promise<IResponseStructure<string>> {
    await this.productTypeService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功",
    });
  }
}
