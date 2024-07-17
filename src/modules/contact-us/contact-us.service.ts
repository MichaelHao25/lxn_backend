import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPageResponse } from "src/interface";
import { CreateContactUsDto } from "./dto/create-contact-us.dto";
import { FindContactUsDto } from "./dto/find-contact-us.dto";
import { UpdateContactUsDto } from "./dto/update-contact-us.dto";
import { ContactUs, ContactUsDocument } from "./entities/contact-us.entity";

const selectFields = {
  _id: 1,
  origin: 1,
  companyName: 1,
  name: 1,
  tel: 1,
  appendAttributes: 1,
  understandType: 1,
  scopeOfAuthority: 1,
  updatedAt: 1,
};
@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(ContactUs.name) private contactUsModel: Model<ContactUs>
  ) {}
  async create(
    createContactUsDto: CreateContactUsDto
  ): Promise<ContactUsDocument> {
    const newContactUs = new this.contactUsModel(createContactUsDto);
    await newContactUs.save();
    return newContactUs;
  }

  async findAll(
    query: FindContactUsDto
  ): Promise<IPageResponse<ContactUsDocument>> {
    const { pageSize, current, _id, origin, companyName, name, tel } = query;
    const queryExpress = {
      ...(_id ? { _id } : {}),
      ...(origin
        ? {
            origin: { $regex: origin },
          }
        : {}),
      ...(companyName
        ? {
            companyName: { $regex: companyName },
          }
        : {}),
      ...(name
        ? {
            name: { $regex: name },
          }
        : {}),
      ...(tel
        ? {
            tel: { $regex: tel },
          }
        : {}),
    };
    const total = await this.contactUsModel.countDocuments(queryExpress);
    const list = await this.contactUsModel
      .find(queryExpress, selectFields)
      .limit(pageSize)
      .skip(pageSize * (current - 1));
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list,
    };
  }

  async findOne(_id: string): Promise<ContactUsDocument | null> {
    return await this.contactUsModel.findById({ _id }, selectFields);
  }

  async update(_id: string, updateContactUsDto: UpdateContactUsDto) {
    const item = await this.findOne(_id);
    Object.keys(updateContactUsDto).map((key) => {
      item[key] = updateContactUsDto[key];
    });
    await item.save();
    return item;
  }

  async remove(_id: string) {
    await this.contactUsModel.deleteOne({ _id });
  }
}
