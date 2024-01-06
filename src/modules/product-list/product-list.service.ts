import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import parseResponse, { IResponseStructure } from "src/common/parseResponse";
import { CreateProductListDto } from "./dto/create-product-list.dto";
import { UpdateProductListDto } from "./dto/update-product-list.dto";
import {
  ProductList,
  ProductListDocument,
} from "./entities/product-list.entity";

@Injectable()
export class ProductListService {
  constructor(
    @InjectModel(ProductList.name) private productListModel: Model<ProductList>
  ) {}
  /**
   * 创建一个新的产品
   * @param createProductListDto
   * @returns
   */
  async create(
    createProductListDto: CreateProductListDto
  ): Promise<ProductListDocument> {
    const { typeId } = createProductListDto;
    const product = new this.productListModel(createProductListDto);
    await product.save();
    return product;
  }

  async findAll(): Promise<ProductListDocument[]> {
    return await this.productListModel.find({}).limit(20);
  }

  async findOne(_id: string): Promise<ProductListDocument[]> {
    return await this.productListModel.findById(_id);
  }

  async update(
    _id: string,
    updateProductListDto: UpdateProductListDto
  ): Promise<ProductListDocument> {
    const product = await this.productListModel.findById(_id);
    const { typeId, title, mainPicture, banner, description, details } =
      updateProductListDto;
    if (typeId) {
      product.typeId = typeId;
    }
    if (title) {
      product.title = title;
    }
    if (mainPicture) {
      product.mainPicture = mainPicture;
    }
    if (banner) {
      product.banner = banner;
    }
    if (description) {
      product.description = description;
    }
    if (details) {
      product.details = details;
    }
    await product.save();
    return product;
  }

  async remove(_id: string): Promise<IResponseStructure<string>> {
    await this.productListModel.deleteOne({ _id });
    return parseResponse({
      data: "删除成功！",
    });
  }
}
