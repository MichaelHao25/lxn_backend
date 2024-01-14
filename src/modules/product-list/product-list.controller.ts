import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { IResponseStructure } from "src/utils/interface";
import { ProductTypeService } from "../product-type/product-type.service";
import { CreateProductListDto } from "./dto/create-product-list.dto";
import { FindProductListDto } from "./dto/find-product-list.dto";
import { UpdateProductListDto } from "./dto/update-product-list.dto";
import { ProductListService } from "./product-list.service";

@Controller("product-list")
export class ProductListController {
  constructor(
    private readonly productListService: ProductListService,
    private readonly productTypeService: ProductTypeService
  ) {}
  /**
   * 创建一个新的产品
   */
  @Post()
  async create(@Body() createProductListDto: CreateProductListDto) {
    const { typeId } = createProductListDto;
    const type = await this.productTypeService.findOne(typeId);
    if (type) {
      const res = await this.productListService.create(createProductListDto);
      return parseSuccessResponse({ data: res });
    } else {
      throw new HttpException("类型不存在", HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get()
  /**
   * 查询所有的产品
   */
  async findAll(@Query() query: FindProductListDto) {
    const res = await this.productListService.findAll(query);
    return parseSuccessResponse({ data: res });
  }

  @Get(":_id")
  /**
   * 获取单个产品
   * @summary 测试
   * @description 测试描述
   */
  async findOne(@Param("_id") _id: string) {
    const res = await this.productListService.findOne(_id);
    return parseSuccessResponse({ data: res });
  }

  //   @ApiOperation({
  //     summary: "更新类型",
  //     description: "根据 _id 更新这个类型的其他属性",
  //   })
  /**
   * 更新产品详情
   */
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateProductListDto: UpdateProductListDto
  ) {
    const { typeId } = updateProductListDto;
    const product = await this.productListService.findOne(_id);
    if (product) {
      if (typeId) {
        const type = await this.productTypeService.findOne(typeId);
        if (type) {
          const res = await this.productListService.update(
            _id,
            updateProductListDto
          );
          return parseSuccessResponse({ data: res });
        } else {
          return new HttpException("类型不正确", HttpStatus.FORBIDDEN);
        }
      } else {
        const res = await this.productListService.update(
          _id,
          updateProductListDto
        );
        return parseSuccessResponse({ data: res });
      }
    } else {
      return new HttpException("id不正确", HttpStatus.FORBIDDEN);
    }
  }

  /**
   * 删除产品
   * @param _id
   * @returns
   */
  @Delete(":_id")
  async remove(@Param("_id") _id: string): Promise<IResponseStructure<string>> {
    await this.productListService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功！",
    });
  }
}
