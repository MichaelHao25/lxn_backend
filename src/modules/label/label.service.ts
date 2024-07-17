import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPageResponse } from "src/interface";
import { CreateLabelDto } from "./dto/create-label.dto";
import { FindLabelDto } from "./dto/find-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";
import { Label, LabelDocument } from "./entities/label.entity";

export const LabelSelectFields = {
  _id: 1,
  title: 1,
  updatedAt: 1,
};
@Injectable()
export class LabelService {
  constructor(@InjectModel(Label.name) private labelModel: Model<Label>) {}

  async create(createLabelDto: CreateLabelDto): Promise<LabelDocument> {
    const label = new this.labelModel(createLabelDto);
    await label.save();
    return label;
  }

  async findAll(
    params: FindLabelDto
  ): Promise<IPageResponse<{ _id: string; title: string }>> {
    const { current, pageSize, title } = params;
    const queryExpress = {
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
    };
    const total = await this.labelModel.countDocuments(queryExpress);
    const list = await this.labelModel
      .find<{
        _id: string;
        title: string;
      }>(queryExpress, LabelSelectFields)
      .limit(pageSize)
      .skip((current - 1) * pageSize)
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

  async findOne(_id: string): Promise<LabelDocument> {
    return await this.labelModel.findById(_id, LabelSelectFields);
  }
  async findById(_idList: string[] = []): Promise<(LabelDocument | null)[]> {
    const list = await Promise.all(
      _idList.map(async (_id) => await this.findOne(_id))
    );
    return list;
  }
  async update(
    _id: string,
    updateLabelDto: UpdateLabelDto
  ): Promise<LabelDocument> {
    const label = await this.findOne(_id);
    if (label) {
      Object.keys(updateLabelDto).map((key) => {
        label[key] = updateLabelDto[key];
      });
      await label.save();
      return label;
    }
    throw new HttpException("id错误", HttpStatus.BAD_REQUEST);
  }

  async remove(_id: string) {
    await this.labelModel.deleteOne({ _id });
  }
}
