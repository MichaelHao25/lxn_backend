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
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { IResponseStructure } from "src/utils/interface";
import { ProductTypeService } from "../product-type/product-type.service";
import { CreateProductListDto } from "./dto/create-product-list.dto";
import { UpdateProductListDto } from "./dto/update-product-list.dto";
import { ProductListService } from "./product-list.service";

@Controller("product-list")
export class ProductListController {
  constructor(
    private readonly productListService: ProductListService,
    private readonly productTypeService: ProductTypeService
  ) {}
  @Post()
  @ApiOperation({ summary: "创建类型", description: "创建一个新的类型" })
  async create(@Body() createProductListDto: CreateProductListDto) {
    const { typeId } = createProductListDto;
    const type = await this.productTypeService.findOne(typeId);
    if (type) {
      return await this.productListService.create(createProductListDto);
    } else {
      throw new HttpException("类型不存在", HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get()
  @ApiOperation({ summary: "查询类型", description: "查询所有的类型" })
  async findAll() {
    return this.productListService.findAll();
  }

  @Get(":_id")
  @ApiOperation({
    summary: "获取类型",
    description: "根据id查询这个类型的详细信息",
  })
  async findOne(@Param("_id") _id: string) {
    return this.productListService.findOne(_id);
  }

  @Patch(":_id")
  @ApiOperation({
    summary: "更新类型",
    description: "根据 _id 更新这个类型的其他属性",
  })
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
          return await this.productListService.update(
            _id,
            updateProductListDto
          );
        } else {
          return new HttpException("类型不正确", HttpStatus.FORBIDDEN);
        }
      } else {
        return await this.productListService.update(_id, updateProductListDto);
      }
    } else {
      return new HttpException("id不正确", HttpStatus.FORBIDDEN);
    }
  }

  @Delete(":_id")
  @ApiOperation({
    summary: "删除类型",
    description: "根据 _id 删除类型",
  })
  async remove(@Param("_id") _id: string): Promise<IResponseStructure<string>> {
    return await this.productListService.remove(_id);
  }
}
