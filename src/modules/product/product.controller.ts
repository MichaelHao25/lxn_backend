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
import { ObjectId } from "mongoose";
import { Public } from "src/common/decorators/public.decorator";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { IResponseStructure } from "src/utils/interface";
import { TypeService } from "../type/type.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly typeService: TypeService
  ) {}
  /**
   * 创建一个新的产品
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const { typeId } = createProductDto;
    const type = await this.typeService.findOne(typeId);
    if (type) {
      const res = await this.productService.create(createProductDto);
      return parseSuccessResponse({ data: res });
    } else {
      throw new HttpException("类型不存在", HttpStatus.NOT_ACCEPTABLE);
    }
  }

  /**
   * 查询所有的产品
   */
  @Get()
  @Public()
  async findAll(@Query() query: FindProductDto) {
    const res = await this.productService.findAll(query);
    return parseSuccessResponse({ data: res });
  }

  /**
   * 获取单个产品
   * @summary 测试
   * @description 测试描述
   */
  @Get(":_id")
  @Public()
  async findOne(@Param("_id") _id: ObjectId) {
    const res = await this.productService.findOne(_id);
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
    @Param("_id") _id: ObjectId,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const { type } = updateProductDto;
    const product = await this.productService.findOne(_id);
    if (product) {
      if (typeId) {
        const type = await this.typeService.findOne(typeId);
        if (type) {
          const res = await this.productService.update(_id, updateProductDto);
          return parseSuccessResponse({ data: res });
        } else {
          return new HttpException("类型不正确", HttpStatus.FORBIDDEN);
        }
      } else {
        const res = await this.productService.update(_id, updateProductDto);
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
  async remove(
    @Param("_id") _id: ObjectId
  ): Promise<IResponseStructure<string>> {
    await this.productService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功！",
    });
  }
}
