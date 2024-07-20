import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TypeSelectFields, TypeService } from "../type/type.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { Page, PageDocument } from "./entities/page.entity";
const PageSelectFields = {
  indexShowType: 1,
  updatedAt: 1,
  createdAt: 1,
};
@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,

    private readonly typeService: TypeService
  ) {}

  async create(createPageDto: CreatePageDto) {
    const { indexShowType } = createPageDto;
    const list = await this.typeService.findById(indexShowType);
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

    page.indexShowType = list;

    await page.save();
    return page;
  }

  findAll() {
    return `This action returns all page`;
  }

  async findOne() {
    return await this.pageModel
      .findOne({}, PageSelectFields)
      .populate("indexShowType", TypeSelectFields);
  }

  async update(_id: string, updatePageDto: UpdatePageDto) {
    const item = await this.findOne();
    const { indexShowType } = updatePageDto;
    const list = await this.typeService.findById(indexShowType);
    if (list.every((item) => item === null)) {
      throw new HttpException("id错误", HttpStatus.BAD_REQUEST);
    }
    item.indexShowType = list;
    await item.save();
    return item;
  }

  remove(_id: string) {
    return `This action removes a #${_id} page`;
  }
}
