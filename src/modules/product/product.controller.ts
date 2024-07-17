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
import { Public } from "src/common/decorators/public.decorator";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { IResponseStructure } from "src/interface";
import { LabelService } from "../label/label.service";
import { TypeService } from "../type/type.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly typeService: TypeService,
    private readonly labelService: LabelService
  ) {}
  /**
   * 创建一个新的产品
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const { type } = createProductDto;
    const typeList = await this.typeService.findById(type);
    if (typeList.every((item) => item !== null)) {
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
  async findOne(@Param("_id") _id: string) {
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
    @Param("_id") _id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const { type, label } = updateProductDto;
    const product = await this.productService.findOne(_id);
    if (product) {
      if (label) {
        const labelList = await this.labelService.findById(label);
        if (labelList.every((item) => item === null)) {
          return new HttpException("类型不正确", HttpStatus.FORBIDDEN);
        }
      }
      if (type) {
        const typeList = await this.typeService.findById(type);
        if (typeList.every((item) => item === null)) {
          return new HttpException("类型不正确", HttpStatus.FORBIDDEN);
        }
      }
      const res = await this.productService.update(_id, updateProductDto);
      return parseSuccessResponse({ data: res });
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
    await this.productService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功！",
    });
  }
}
