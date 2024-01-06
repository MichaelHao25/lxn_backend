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
  async create(@Body() createProductListDto: CreateProductListDto) {
    const { typeId } = createProductListDto;
    const type = await this.productTypeService.findOne(typeId);
    if (type) {
      return this.productListService.create(createProductListDto);
    } else {
      throw new HttpException("类型不存在", HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get()
  async findAll() {
    return this.productListService.findAll();
  }

  @Get(":_id")
  async findOne(@Param("_id") _id: string) {
    return this.productListService.findOne(_id);
  }

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
          return this.productListService.update(_id, updateProductListDto);
        } else {
          return new HttpException("类型不正确", HttpStatus.FORBIDDEN);
        }
      } else {
        return this.productListService.update(_id, updateProductListDto);
      }
    } else {
      return new HttpException("id不正确", HttpStatus.FORBIDDEN);
    }
  }

  @Delete(":_id")
  remove(@Param("_id") _id: string) {
    return this.productListService.remove(_id);
  }
}
