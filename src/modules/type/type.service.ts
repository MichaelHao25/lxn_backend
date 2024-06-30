import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateTypeDto } from "./dto/create-type.dto";
import { FindTypeDto, IProductOneLevelType } from "./dto/find-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { Type, TypeDocument } from "./entities/type.entity";

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
    params?: FindTypeDto
  ): Promise<{ _id: ObjectId; title: string }[]> {
    const { type } = params;
    if (type) {
      const TopLevel = {
        [IProductOneLevelType.product]: "659581b2f2a5d6175488bdf1",
        [IProductOneLevelType.news]: "65a3fd78523c7640007e31f8",
      };
      const parentId = IProductOneLevelType.product;
      return await this.typeModel
        .find<{
          _id: ObjectId;
          title: string;
        }>(
          {
            parent: TopLevel[type],
          },
          {
            _id: 1,
            title: 1,
          }
        )
        .sort({ order: -1 });
    }

    const list = await this.typeModel.find<{
      _id: ObjectId;
      title: string;
    }>(
      {},
      {
        _id: 1,
        title: 1,
      }
    );
    return list;
  }

  async findOne(_id: ObjectId): Promise<TypeDocument> {
    return await this.typeModel.findById(_id);
  }

  async update(
    _id: ObjectId,
    updateTypeDto: UpdateTypeDto
  ): Promise<TypeDocument> {
    const type = await this.findOne(_id);
    const { parent, title } = updateTypeDto;
    if (type) {
      if (parent) {
        const parentType = await this.findOne(_id);
        if (parentType) {
          type.parent = parentType._id.toString();
        } else {
          new HttpException("父级类型不存在", HttpStatus.BAD_REQUEST);
        }
      }
      type.title = title;
      await type.save();
      return type;
    }
    new HttpException("id错误", HttpStatus.BAD_REQUEST);
  }

  async remove(_id: ObjectId) {
    await this.typeModel.deleteOne({ _id });
  }
}
