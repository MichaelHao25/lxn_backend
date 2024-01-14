import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductAttachmentDto } from "./dto/create-product-attachment.dto";
import { UpdateProductAttachmentDto } from "./dto/update-product-attachment.dto";
import { ProductAttachment } from "./entities/product-attachment.entity";
import { FindProductListDto } from "../product-list/dto/find-product-list.dto";

@Injectable()
export class ProductAttachmentService {
  constructor(
    @InjectModel(ProductAttachment.name)
    private productAttachmentModel: Model<ProductAttachment>
  ) {}
  create(createProductAttachmentDto: CreateProductAttachmentDto) {
    const attachment = new this.productAttachmentModel(
      createProductAttachmentDto
    );
  }

  findAll(query: FindProductListDto) {
    return `This action returns all productAttachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productAttachment`;
  }

  update(id: number, updateProductAttachmentDto: UpdateProductAttachmentDto) {
    return `This action updates a #${id} productAttachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} productAttachment`;
  }
}
