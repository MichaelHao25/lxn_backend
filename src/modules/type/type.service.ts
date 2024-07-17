import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPageResponse } from "src/interface";
import { CreateTypeDto } from "./dto/create-type.dto";
import { FindTypeDto } from "./dto/find-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { Type, TypeDocument } from "./entities/type.entity";

export const TypeSelectFields = {
  _id: 1,
  title: 1,
  parent: 1,
  updatedAt: 1,
};
@Injectable()
export class TypeService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  async create(createTypeDto: CreateTypeDto): Promise<TypeDocument> {
    const { parent, ...attr } = createTypeDto;
    if (parent) {
      const parentItem = await this.findOne(parent);
      if (parentItem) {
        const type = new this.typeModel(attr);
        type.parent = parentItem;
        await type.save();
        return type;
      } else {
        throw new HttpException("父级类型不存在", HttpStatus.BAD_REQUEST);
      }
    } else {
      const type = new this.typeModel(attr);
      await type.save();
      return type;
    }
  }

  async findAll(params: FindTypeDto = {}): Promise<IPageResponse> {
    const { pageSize, current, parent, title } = params;
    const queryExpress = {
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
      ...(parent ? { parent } : {}),
    };

    const total = await this.typeModel.countDocuments(queryExpress);
    const list = await this.typeModel
      .find<{
        _id: string;
        title: string;
      }>(queryExpress, TypeSelectFields)
      .limit(pageSize)
      .skip((current - 1) * pageSize)
      .populate("parent", TypeSelectFields)
      .sort({ updatedAt: -1 });
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list,
    };
  }

  async findOne(_id: string): Promise<TypeDocument | null> {
    const res = await this.typeModel
      .findById(_id, TypeSelectFields)
      .populate("parent", TypeSelectFields);
    return res;
  }
  async findById(_idList: string[] = []): Promise<(TypeDocument | null)[]> {
    const list = await Promise.all(
      _idList.map(async (_id) => await this.findOne(_id))
    );
    return list;
  }

  async update(
    _id: string,
    updateTypeDto: UpdateTypeDto
  ): Promise<TypeDocument> {
    const type = await this.findOne(_id);
    if (type) {
      await Promise.all(
        Object.entries(updateTypeDto).map(async ([key, value]) => {
          if (key === "parent") {
            if (value === "") {
              type.parent = undefined;
            } else {
              const parentType = await this.findOne(value);
              if (parentType) {
                type.parent = parentType;
              } else {
                throw new HttpException(
                  "父级类型不存在",
                  HttpStatus.BAD_REQUEST
                );
              }
            }
          }
          if (key === "title") {
            type[key] = value;
          }
        })
      );
      await type.save();
      return type;
    }
    throw new HttpException("id错误", HttpStatus.BAD_REQUEST);
  }

  async remove(_id: string) {
    const data = await this.findAll({ parent: _id });
    if (data.list.length == 0) {
      await this.typeModel.deleteOne({ _id });
    } else {
      throw new HttpException(
        "请先删除类型下面的子类型",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
