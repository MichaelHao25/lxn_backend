import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { ProductService } from "../product/product.service";
import { TypeService } from "../type/type.service";
import { CreateProductAttachmentDto } from "./dto/create-product-attachment.dto";
import { FindProductAttachmentDto } from "./dto/find-product-attachment.dto";
import {
  ProductAttachment,
  ProductAttachmentDocument,
} from "./entities/product-attachment.entity";

@Injectable()
export class ProductAttachmentService {
  constructor(
    @InjectModel(ProductAttachment.name)
    private productAttachmentModel: Model<ProductAttachment>,
    private readonly productService: ProductService,
    private readonly typeService: TypeService
  ) {}

  async create(createProductAttachmentDto: CreateProductAttachmentDto) {
    const { name, product_id, url, order } = createProductAttachmentDto;
    const productItem = await this.productService.findOne(product_id);
    if (!productItem) {
      throw new InternalServerErrorException("选择的商品不存在，请联系管理员");
    }
    const attachment = new this.productAttachmentModel({
      name,
      product_id,
      url,
      productType_id: productItem.type,
      ...(order ? { order } : {}),
    });
    await attachment.save();
    return attachment;
  }
  async findAll(props: FindProductAttachmentDto) {
    const { pageSize, current, typeId, name } = props;
    const queryExpress: FilterQuery<ProductAttachmentDocument> = {
      ...(typeId ? { productType_id: typeId } : {}),
      ...(name ? { name: { $regex: name } } : {}),
    };
    const total = await this.productAttachmentModel.countDocuments(
      queryExpress
    );
    const res = await this.productAttachmentModel
      .find(queryExpress)
      .limit(pageSize)
      .skip((current - 1) * pageSize)
      .sort({ order: -1 });
    const list = await Promise.all(
      res.map(async (item) => {
        const { updatedAt, product_id, productType_id, url, _id, name } = item;
        const productItem = await this.productService.findOne(product_id);

        const typeItem = await this.typeService.findOne(productType_id);
        return {
          type: typeItem ? typeItem.title : "",
          title: productItem ? productItem.title : "",
          updatedAt,
          url,
          _id,
          name,
        };
      })
    );
    // typeName
    //   producyName
    //   typeService
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list,
    };
  }

  //   findOne(id: number) {
  //     return `This action returns a #${id} productAttachment`;
  //   }

  //   update(id: number, updateProductAttachmentDto: UpdateProductAttachmentDto) {
  //     return `This action updates a #${id} productAttachment`;
  //   }

  async remove(_id: ObjectId) {
    await this.productAttachmentModel.deleteOne({ _id });
  }
}
