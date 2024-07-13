import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TypeService } from "../type/type.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product, ProductDocument } from "./entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly typeService: TypeService
  ) {}
  /**
   * 创建一个新的产品
   * @param createProductDto
   * @returns
   */
  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product = new this.productModel(createProductDto);
    await product.save();
    return product;
  }

  async findAll(query: FindProductDto) {
    const { current, pageSize, typeId, title } = query;
    const queryExpress = {
      ...(typeId ? { typeId } : {}),
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
    };
    const total = await this.productModel.countDocuments(queryExpress);
    const res = await this.productModel
      .find(queryExpress, {
        title: 1,
        _id: 1,
        mainPicture: 1,
        typeId: 1,
        updatedAt: 1,
        order: 1,
      })
      .limit(pageSize)
      .skip((current - 1) * pageSize)
      .sort({ order: -1 });
    const list = await Promise.all(
      res.map(async (item) => {
        const { type, _id, title, mainPicture, updatedAt, order } = item;
        const typeItem = await this.typeService.findOne(type);
        return {
          _id,
          title,
          mainPicture,
          updatedAt,
          type: typeItem.title,
          order,
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

  async findOne(_id: string): Promise<ProductDocument> {
    return await this.productModel.findById(_id);
  }

  async update(
    _id: string,
    updateProductDto: UpdateProductDto
  ): Promise<ProductDocument> {
    const product = await this.productModel.findById(_id);
    const { type, title, mainPicture, banner, description, details, order } =
      updateProductDto;
    if (type) {
      product.type = type;
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
