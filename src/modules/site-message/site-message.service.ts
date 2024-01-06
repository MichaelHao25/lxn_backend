import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import parseResponse from "src/common/parseResponse";
import { CreateSiteMessageDto } from "./dto/create-site-message.dto";
import { UpdateSiteMessageDto } from "./dto/update-site-message.dto";
import {
  SiteMessage,
  SiteMessageDocument,
} from "./entities/site-message.entity";

@Injectable()
export class SiteMessageService {
  constructor(
    @InjectModel(SiteMessage.name) private siteMessageModel: Model<SiteMessage>
  ) {}
  async create(
    createSiteMessageDto: CreateSiteMessageDto
  ): Promise<SiteMessageDocument> {
    const newSiteMessage = new this.siteMessageModel(createSiteMessageDto);
    await newSiteMessage.save();
    return newSiteMessage;
  }

  async findAll(): Promise<SiteMessageDocument[]> {
    const list = await this.siteMessageModel
      .find({})
      .limit(20)
      .skip(20 * 1);
    return list;
  }

  findOne(_id: string): Promise<SiteMessageDocument | null> {
    return this.siteMessageModel.findById({ _id });
  }

  update(_id: string, updateSiteMessageDto: UpdateSiteMessageDto) {
    return `This action updates a #${_id} siteMessage`;
  }

  async remove(_id: string) {
    this.siteMessageModel.deleteOne({ _id });
    return parseResponse("删除成功!");
  }
}
