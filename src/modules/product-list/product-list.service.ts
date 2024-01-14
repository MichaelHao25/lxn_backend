import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductTypeService } from "../product-type/product-type.service";
import { CreateProductListDto } from "./dto/create-product-list.dto";
import { FindProductListDto } from "./dto/find-product-list.dto";
import { UpdateProductListDto } from "./dto/update-product-list.dto";
import {
  ProductList,
  ProductListDocument,
} from "./entities/product-list.entity";

@Injectable()
export class ProductListService {
  constructor(
    @InjectModel(ProductList.name) private productListModel: Model<ProductList>,
    private readonly productTypeService: ProductTypeService
  ) {}
  /**
   * 创建一个新的产品
   * @param createProductListDto
   * @returns
   */
  async create(
    createProductListDto: CreateProductListDto
  ): Promise<ProductListDocument> {
    const product = new this.productListModel(createProductListDto);
    await product.save();
    return product;
  }

  async findAll(query: FindProductListDto) {
    const { current, pageSize, typeName, title } = query;
    const queryExpress = {
      ...(typeName ? { typeId: typeName } : {}),
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
    };
    const total = await this.productListModel.countDocuments(queryExpress);
    const res = await this.productListModel
      .find(queryExpress, {
        title: 1,
        _id: 1,
        mainPicture: 1,
        typeId: 1,
        updatedAt: 1,
      })
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    const list = await Promise.all(
      res.map(async (item) => {
        const { typeId, _id, title, mainPicture, updatedAt } = item;
        const type = await this.productTypeService.findOne(typeId);
        return {
          _id,
          title,
          mainPicture,
          updatedAt,
          typeName: type.typeName,
        };
      })
    );
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list,
    };
  }

  async findOne(_id: string): Promise<ProductListDocument> {
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

  async remove(_id: string) {
    await this.productListModel.deleteOne({ _id });
  }
}
