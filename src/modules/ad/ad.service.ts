import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateAdDto } from "./dto/create-ad.dto";
import { FindAdDto } from "./dto/find-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";
import { Ad, AdDocument } from "./entities/ad.entity";

const selectFields = {
  _id: 1,
  type: 1,
  title: 1,
  description: 1,
  url: 1,
  updateAt: 1,
};
@Injectable()
export class AdService {
  constructor(@InjectModel(Ad.name) private contactUsModel: Model<Ad>) {}
  async create(createAdDto: CreateAdDto): Promise<AdDocument> {
    const ad = new this.contactUsModel(createAdDto);
    await ad.save();
    return ad;
  }

  async findAll(query: FindAdDto): Promise<AdDocument[]> {
    const { pageSize, current } = query;
    const res = await this.contactUsModel
      .find({}, selectFields)
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    return res;
  }

  findOne(_id: ObjectId): Promise<AdDocument> {
    return this.contactUsModel.findById({ _id }, selectFields);
  }

  update(_id: ObjectId, updateAdDto: UpdateAdDto) {
    return `This action updates a #${_id} ad`;
  }

  remove(_id: ObjectId) {
    return `This action removes a #${_id} ad`;
  }
}
