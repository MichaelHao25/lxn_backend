import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LabelService } from "../label/label.service";
import { IGlobalConfig } from "../page/interface";
import { PageService } from "../page/page.service";
import { TypeService } from "../type/type.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product, ProductDocument } from "./entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly typeService: TypeService,
    private readonly labelService: LabelService,
    @Inject(forwardRef(() => PageService))
    private readonly pageService: PageService
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
    const {
      current,
      pageSize,
      type,
      title,
      label,
      releaseDate,
      authorizationInformation_property,
      authorizationInformation_scope,
    } = query;
    const queryExpress = {
      ...(type ? { type: { $all: type } } : {}),
      ...(label ? { label: { $all: label } } : {}),
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
      ...(releaseDate
        ? {
            /**
             * 大于
             */
            releaseDate_start: {
              $lte: releaseDate,
            },
            /**
             * 小于
             */
            releaseDate_end: {
              $gte: releaseDate,
            },
          }
        : {}),
      ...(authorizationInformation_scope
        ? { authorizationInformation_scope }
        : {}),
      ...(authorizationInformation_property
        ? { authorizationInformation_property }
        : {}),
    };
    const total = await this.productModel.countDocuments(queryExpress);
    const res = await this.productModel
      .find(
        queryExpress
        // {
        //   releaseDate_start: {
        //     $gte: new Date("2024-07-10"),
        //   },
        // },
      )
      .limit(pageSize)
      .skip((current - 1) * pageSize)
      .sort({ order: -1 })
      .populate("type")
      .populate("label");
    const defaultProductImage = await this.pageService.findConfig({
      type: IGlobalConfig.defaultProductImgConfig,
    });
    const parseList = res.map((item) => {
      if (item.mainPictureUrl === undefined) {
        if (defaultProductImage.defaultProductImage) {
          item.mainPictureUrl = defaultProductImage.defaultProductImage;
        }
      }
      return item;
    });
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list: parseList,
    };
  }

  async findOne(_id: string): Promise<ProductDocument> {
    const res = await this.pageService.findConfig({
      type: IGlobalConfig.defaultProductImgConfig,
    });
    const item = await this.productModel
      .findById(_id)
      .populate("type")
      .populate("label");
    if (item.mainPictureUrl === undefined) {
      if (res.defaultProductImage) {
        item.mainPictureUrl = res.defaultProductImage;
      }
    }
    return item;
  }

  async update(
    _id: string,
    updateProductDto: UpdateProductDto
  ): Promise<ProductDocument> {
    const product = await this.productModel.findById(_id);
    const { type, label, ...attr } = updateProductDto;
    if (type) {
      const typeItem = await this.typeService.findById(type);
      if (typeItem) {
        product.type = typeItem;
      } else {
        throw new HttpException("类型不存在", HttpStatus.NOT_ACCEPTABLE);
      }
    }
    if (label) {
      const labelList = await this.labelService.findById(label);
      if (labelList.every((item) => item !== null)) {
        product.label = labelList;
      } else {
        throw new HttpException("标签不存在", HttpStatus.NOT_ACCEPTABLE);
      }
    }
    Object.entries(attr).forEach(([key, value]) => {
      product[key] = value;
    });
    await product.save();
    return product;
  }

  async remove(_id: string) {
    await this.productModel.deleteOne({ _id });
  }
}
