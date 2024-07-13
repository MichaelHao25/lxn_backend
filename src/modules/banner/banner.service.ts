import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBannerDto } from "./dto/create-banner.dto";
import { FindBannerDto } from "./dto/find-banner.dto";
import { UpdateBannerDto } from "./dto/update-banner.dto";
import { Banner, BannerDocument } from "./entities/banner.entity";
const selectFields = {
  _id: 1,
  type: 1,
  title: 1,
  description: 1,
  url: 1,
  updateAt: 1,
};

@Injectable()
export class BannerService {
  constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>) {}
  async create(createBannerDto: CreateBannerDto): Promise<BannerDocument> {
    const bannerItem = new this.bannerModel(createBannerDto);
    await bannerItem.save();
    const res = await this.findOne(bannerItem.id);
    return res;
  }

  async findAll(query: FindBannerDto): Promise<BannerDocument[]> {
    const { current, pageSize } = query;
    const res = await this.bannerModel
      .find({}, selectFields)
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    return res;
  }

  async findOne(_id: string): Promise<BannerDocument> {
    return this.bannerModel.findById(_id, selectFields);
  }

  async update(
    _id: string,
    updateBannerDto: UpdateBannerDto
  ): Promise<BannerDocument> {
    const res = await this.findOne(_id);
    Object.keys(updateBannerDto).map((key) => {
      res[key] = updateBannerDto[key];
    });
    await res.save();
    return this.findOne(_id);
  }

  async remove(_id: string) {
    await this.bannerModel.deleteOne({ _id });
  }
}
