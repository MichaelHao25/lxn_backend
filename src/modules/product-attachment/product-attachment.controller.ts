import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { CreateProductAttachmentDto } from "./dto/create-product-attachment.dto";
import { FindProductAttachmentDto } from "./dto/find-product-attachment.dto";
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
  async findAll(@Query() query: FindProductAttachmentDto) {
    const res = await this.productAttachmentService.findAll(query);
    return parseSuccessResponse({ data: res });
  }

  //   @Get(":id")
  //   findOne(@Param("id") id: string) {
  //     return this.productAttachmentService.findOne(+id);
  //   }

  //   @Patch(":id")
  //   update(
  //     @Param("id") id: string,
  //     @Body() updateProductAttachmentDto: UpdateProductAttachmentDto
  //   ) {
  //     return this.productAttachmentService.update(
  //       +id,
  //       updateProductAttachmentDto
  //     );
  //   }

  @Delete(":_id")
  async remove(@Param("_id") _id: string) {
    await this.productAttachmentService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功！",
    });
  }
}
