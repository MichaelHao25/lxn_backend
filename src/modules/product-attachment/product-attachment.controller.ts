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
import { FindProductListDto } from "../product-list/dto/find-product-list.dto";
import { CreateProductAttachmentDto } from "./dto/create-product-attachment.dto";
import { UpdateProductAttachmentDto } from "./dto/update-product-attachment.dto";
import { ProductAttachmentService } from "./product-attachment.service";

@Controller("product-attachment")
export class ProductAttachmentController {
  constructor(
    private readonly productAttachmentService: ProductAttachmentService
  ) {}

  @Post()
  async create(@Body() createProductAttachmentDto: CreateProductAttachmentDto) {
    const res = await this.productAttachmentService.create(
      createProductAttachmentDto
    );
    return parseSuccessResponse({
      data: res,
    });
  }

  @Get()
  async findAll(@Query() query: FindProductListDto) {
    const res = await this.productAttachmentService.findAll(query);
    return parseSuccessResponse({ data: res });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productAttachmentService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductAttachmentDto: UpdateProductAttachmentDto
  ) {
    return this.productAttachmentService.update(
      +id,
      updateProductAttachmentDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productAttachmentService.remove(+id);
  }
}
