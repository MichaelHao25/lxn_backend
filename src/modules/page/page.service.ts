import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LabelService } from "../label/label.service";
import { LabelSelectFields } from "./../label/label.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { Page, PageDocument } from "./entities/page.entity";
const PageSelectFields = {
  indexShowLabel: 1,
  updatedAt: 1,
  createdAt: 1,
};
@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,

    private readonly labelService: LabelService
  ) {}

  async create(createPageDto: CreatePageDto) {
    const { indexShowLabel } = createPageDto;
    const list = await this.labelService.findById(indexShowLabel);
    if (list.every((item) => item === null)) {
      throw new HttpException("id错误", HttpStatus.BAD_REQUEST);
    }
    const page = await new Promise<PageDocument>(async (resolve) => {
      const res = await this.findOne();
      if (res) {
        return resolve(res);
      }
      return resolve(new this.pageModel());
    });

    page.indexShowLabel = list;

    await page.save();
    return page;
  }

  findAll() {
    return `This action returns all page`;
  }

  async findOne() {
    return await this.pageModel
      .findOne({}, PageSelectFields)
      .populate("indexShowLabel", LabelSelectFields);
  }

  async update(_id: string, updatePageDto: UpdatePageDto) {
    const item = await this.findOne();
    const { indexShowLabel } = updatePageDto;
    const list = await this.labelService.findById(indexShowLabel);
    if (list.every((item) => item === null)) {
      throw new HttpException("id错误", HttpStatus.BAD_REQUEST);
    }
    item.indexShowLabel = list;
    await item.save();
    return item;
  }

  remove(_id: string) {
    return `This action removes a #${_id} page`;
  }
}
