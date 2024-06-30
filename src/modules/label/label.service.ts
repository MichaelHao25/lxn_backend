import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateLabelDto } from "./dto/create-label.dto";
import { FindLabelDto } from "./dto/find-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";
import { Label, LabelDocument } from "./entities/label.entity";

@Injectable()
export class LabelService {
  constructor(@InjectModel(Label.name) private labelModel: Model<Label>) {}

  async create(createLabelDto: CreateLabelDto): Promise<LabelDocument> {
    const label = new this.labelModel(createLabelDto);
    await label.save();
    return label;
  }

  async findAll(
    params?: FindLabelDto
  ): Promise<{ _id: ObjectId; title: string }[]> {
    const list = await this.labelModel.find<{
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

  async findOne(_id: ObjectId): Promise<LabelDocument> {
    return await this.labelModel.findById(_id);
  }

  async update(
    _id: ObjectId,
    updateLabelDto: UpdateLabelDto
  ): Promise<LabelDocument> {
    const label = await this.findOne(_id);
    const { title } = updateLabelDto;
    if (label) {
      label.title = title;
      await label.save();
      return label;
    }
    new HttpException("id错误", HttpStatus.BAD_REQUEST);
  }

  async remove(_id: ObjectId) {
    await this.labelModel.deleteOne({ _id });
  }
}
