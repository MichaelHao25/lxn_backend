import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { ProductListService } from "../product-list/product-list.service";
import { ProductTypeService } from "../product-type/product-type.service";
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
    private readonly productListService: ProductListService,
    private readonly productTypeService: ProductTypeService
  ) {}

  async create(createProductAttachmentDto: CreateProductAttachmentDto) {
    const { name, productList_id, url, order } = createProductAttachmentDto;
    const productItem = await this.productListService.findOne(productList_id);
    if (!productItem) {
      throw new InternalServerErrorException("选择的商品不存在，请联系管理员");
    }
    const attachment = new this.productAttachmentModel({
      name,
      productList_id,
      url,
      productType_id: productItem.typeId,
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
        const { updatedAt, productList_id, productType_id, url, _id, name } =
          item;
        const productItem = await this.productListService.findOne(
          productList_id
        );

        const typeItem = await this.productTypeService.findOne(productType_id);
        return {
          typeName: typeItem ? typeItem.typeName : "",
          productTitle: productItem ? productItem.title : "",
          updatedAt,
          url,
          _id,
          name,
        };
      })
    );
    // typeName
    //   producyName
    //   productTypeService
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

  async remove(_id: string) {
    await this.productAttachmentModel.deleteOne({ _id });
  }
}
