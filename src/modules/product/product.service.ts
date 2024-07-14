import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LabelSelectFields, LabelService } from "../label/label.service";
import { TypeSelectFields, TypeService } from "../type/type.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product, ProductDocument } from "./entities/product.entity";

const selectFields = {
  _id: 1,
  type: 1,
  label: 1,
  title: 1,
  mainPicture: 1,
  description: 1,
  releaseDate: 1,
  totalEpisodes: 1,
  duration: 1,
  videoDirection: 1,
  authorizationInformation_property: 1,
  authorizationInformation_firstLaunchPlatform: 1,
  authorizationInformation_scope: 1,
  authorizationInformation_monetizationMethods: 1,
  pilotVideoAddress: 1,
  updateAt: 1,
};
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly typeService: TypeService,
    private readonly labelService: LabelService
  ) {}
  /**
   * 创建一个新的产品
   * @param createProductDto
   * @returns
   */
  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const { type, label, ...productAttr } = createProductDto;
    const product = new this.productModel(productAttr);
    const allType = await this.typeService.findById(type);
    const allLabel = await this.labelService.findById(label);
    product.type = allType;
    product.label = allLabel;
    await product.save();
    return product;
  }

  async findAll(query: FindProductDto) {
    const { current, pageSize, type, title, label } = query;
    const queryExpress = {
      ...(type ? { type } : {}),
      ...(label ? { label } : {}),
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
    };
    const total = await this.productModel.countDocuments(queryExpress);
    const res = await this.productModel
      .find(queryExpress, selectFields)
      .limit(pageSize)
      .skip((current - 1) * pageSize)
      .sort({ order: -1 })
      .populate("type", TypeSelectFields)
      .populate("label", LabelSelectFields);
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list: res,
    };
  }

  async findOne(_id: string): Promise<ProductDocument> {
    return await this.productModel.findById(_id, selectFields);
  }

  async update(
    _id: string,
    updateProductDto: UpdateProductDto
  ): Promise<ProductDocument> {
    const product = await this.productModel.findById(_id);
    const { type, title, mainPicture, description, order } = updateProductDto;

    if (type) {
      const typeItem = await this.typeService.findById(type);
      product.type = typeItem;
    }
    if (title) {
      product.title = title;
    }
    if (mainPicture) {
      product.mainPicture = mainPicture;
    }
    if (description) {
      product.description = description;
    }
    if (order) {
      product.order = order;
    }
    await product.save();
    return product;
  }

  async remove(_id: string) {
    await this.productModel.deleteOne({ _id });
  }
}
