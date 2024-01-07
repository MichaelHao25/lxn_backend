import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import parseResponse from "src/common/parseSuccessResponse";
import { IResponseStructure } from "src/utils/interface";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { UpdateProductTypeDto } from "./dto/update-product-type.dto";
import {
  ProductType,
  ProductTypeDocument,
} from "./entities/product-type.entity";

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType.name) private productTypeModel: Model<ProductType>
  ) {}

  async create(
    createProductTypeDto: CreateProductTypeDto
  ): Promise<ProductTypeDocument> {
    const { parent } = createProductTypeDto;
    if (parent) {
      const res = await this.findOne(parent);
      if (res) {
        const type = new this.productTypeModel(createProductTypeDto);
        await type.save();
        return type;
      } else {
        new HttpException("父级类型不存在", HttpStatus.BAD_REQUEST);
      }
    } else {
      const type = new this.productTypeModel(createProductTypeDto);
      await type.save();
      return type;
    }
  }

  async findAll(params?: IFindAll): Promise<ProductTypeDocument[]> {
    if (params?.type) {
      return await this.productTypeModel.find(
        {
          parent: "659581b2f2a5d6175488bdf1",
        },
        {
          _id: 1,
          typeName: 1,
        }
      );
    }
    const list = await this.productTypeModel
      .find(
        {},
        {
          _id: 1,
          typeName: 1,
        }
      )
      .exec();
    return list;
  }

  async findOne(_id: string): Promise<ProductTypeDocument> {
    return await this.productTypeModel.findById(_id);
  }

  async update(
    _id: string,
    updateProductTypeDto: UpdateProductTypeDto
  ): Promise<IResponseStructure<ProductTypeDocument>> {
    const type = await this.findOne(_id);
    const { parent, typeName } = updateProductTypeDto;
    if (type) {
      if (parent) {
        const parentType = await this.findOne(_id);
        if (parentType) {
          type.parent = parentType._id.toString();
        } else {
          new HttpException("父级类型不存在", HttpStatus.BAD_REQUEST);
        }
      }
      type.typeName = typeName;
      await type.save();
      return parseResponse({
        data: type,
      });
    }
    new HttpException("id错误", HttpStatus.BAD_REQUEST);
  }

  async remove(_id: string): Promise<IResponseStructure<string>> {
    await this.productTypeModel.deleteOne({ _id });
    return parseResponse({
      data: "删除成功",
    });
  }
}
