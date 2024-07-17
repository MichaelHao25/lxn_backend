import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPageResponse } from "src/interface";
import { CreateAdDto } from "./dto/create-ad.dto";
import { FindAdDto } from "./dto/find-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";
import { Ad, AdDocument } from "./entities/ad.entity";

const AdSelectFields = {
  _id: 1,
  type: 1,
  title: 1,
  description: 1,
  pictureUrl: 1,
  gotoUrl: 1,
  updatedAt: 1,
  backgroundColor: 1,
};
@Injectable()
export class AdService {
  constructor(@InjectModel(Ad.name) private adModel: Model<Ad>) {}
  async create(createAdDto: CreateAdDto): Promise<AdDocument> {
    const ad = new this.adModel(createAdDto);
    await ad.save();
    const res = await this.findOne(ad._id.toString());
    return res;
  }

  async findAll(query: FindAdDto): Promise<IPageResponse<AdDocument>> {
    const { pageSize, current, type } = query;
    const queryExpress = { ...(type ? { type } : {}) };
    const total = await this.adModel.countDocuments(queryExpress);
    const list = await this.adModel
      .find(queryExpress, AdSelectFields)
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list,
    };
  }

  async findOne(_id: string): Promise<AdDocument> {
    return await this.adModel.findById({ _id }, AdSelectFields);
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
    await this.adModel.deleteOne({ _id });
  }
}
