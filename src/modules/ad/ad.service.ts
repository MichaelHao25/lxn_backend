import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
    const res = await this.findOne(ad._id.toString());
    return res;
  }

  async findAll(query: FindAdDto): Promise<AdDocument[]> {
    const { pageSize, current } = query;
    const res = await this.contactUsModel
      .find({}, selectFields)
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    return res;
  }

  async findOne(_id: string): Promise<AdDocument> {
    return await this.contactUsModel.findById({ _id }, selectFields);
  }

  async update(_id: string, updateAdDto: UpdateAdDto) {
    const res = await this.findOne(_id);
    Object.keys(updateAdDto).map((key) => {
      res[key] = updateAdDto[key];
    });
    await res.save();
    return res;
  }

  async remove(_id: string) {
    await this.contactUsModel.deleteOne({ _id });
  }
}
