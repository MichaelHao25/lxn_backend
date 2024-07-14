import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTypeDto } from "./dto/create-type.dto";
import { FindTypeDto } from "./dto/find-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { Type, TypeDocument } from "./entities/type.entity";

export const TypeSelectFields = {
  _id: 1,
  title: 1,
  parent: 1,
};
@Injectable()
export class TypeService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  async create(createTypeDto: CreateTypeDto): Promise<TypeDocument> {
    const { parent } = createTypeDto;
    if (parent) {
      const res = await this.findOne(parent);
      if (res) {
        const type = new this.typeModel(createTypeDto);
        await type.save();
        return type;
      } else {
        new HttpException("父级类型不存在", HttpStatus.BAD_REQUEST);
      }
    } else {
      const type = new this.typeModel(createTypeDto);
      await type.save();
      return type;
    }
  }

  async findAll(
    params: FindTypeDto = {}
  ): Promise<{ _id: string; title: string }[]> {
    const { type } = params;
    if (type) {
      return await this.typeModel
        .find<{
          _id: string;
          title: string;
        }>(
          {
            parent: type,
          },
          {
            _id: 1,
            title: 1,
          }
        )
        .sort({ order: -1 });
    }

    const list = await this.typeModel.find<{
      _id: string;
      title: string;
    }>({}, TypeSelectFields);
    return list;
  }

  async findOne(_id: string): Promise<TypeDocument | null> {
    const res = await this.typeModel.findById(_id, TypeSelectFields);
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
                new HttpException("父级类型不存在", HttpStatus.BAD_REQUEST);
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
    new HttpException("id错误", HttpStatus.BAD_REQUEST);
  }

  async remove(_id: string) {
    await this.typeModel.deleteOne({ _id });
  }
}
