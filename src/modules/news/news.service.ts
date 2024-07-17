import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LabelSelectFields, LabelService } from "../label/label.service";
import { TypeSelectFields, TypeService } from "../type/type.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { FindNewsDto } from "./dto/find-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { News, NewsDocument } from "./entities/news.entity";
export const NewSelectFields = {
  title: 1,
  _id: 1,
  mainPictureUrl: 1,
  type: 1,
  updatedAt: 1,
  description: 1,
  label: 1,
  details: 1,
};
@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<News>,
    private readonly typeService: TypeService,
    private readonly labelService: LabelService
  ) {}
  /**
   * 创建一个新的产品
   * @param createNewsDto
   * @returns
   */
  async create(createNewsDto: CreateNewsDto): Promise<NewsDocument> {
    const { type, label, ...attr } = createNewsDto;
    const news = new this.newsModel(attr);
    if (type) {
      const typeItem = await this.typeService.findOne(type);
      if (typeItem) {
        news.type = typeItem;
      } else {
        throw new HttpException("类型不存在", HttpStatus.NOT_ACCEPTABLE);
      }
    }
    if (label) {
      const labelList = await this.labelService.findById(label);
      if (labelList.every((item) => item !== null)) {
        news.label = labelList;
      } else {
        throw new HttpException("标签不存在", HttpStatus.NOT_ACCEPTABLE);
      }
    }
    await news.save();
    return news;
  }

  async findAll(query: FindNewsDto) {
    const { current, pageSize, type, title, label } = query;
    const queryExpress = {
      ...(type ? { type } : {}),
      ...(label ? { label } : {}),
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
    };
    const total = await this.newsModel.countDocuments(queryExpress);
    const list = await this.newsModel
      .find(queryExpress, NewSelectFields)
      .limit(pageSize)
      .skip((current - 1) * pageSize)
      .populate("type", TypeSelectFields)
      .populate("label", LabelSelectFields);

    return {
      page: {
        total,
        current,
        pageSize,
      },
      list,
    };
  }

  async findOne(_id: string): Promise<NewsDocument> {
    return await this.newsModel
      .findById(_id)
      .populate("type", TypeSelectFields)
      .populate("label", LabelSelectFields);
  }

  async update(
    _id: string,
    updateNewsDto: UpdateNewsDto
  ): Promise<NewsDocument> {
    const news = await this.newsModel.findById(_id);
    const { type, label, ...attr } = updateNewsDto;
    if (type) {
      const typeItem = await this.typeService.findOne(type);
      if (typeItem) {
        news.type = typeItem;
      } else {
        throw new HttpException("类型不存在", HttpStatus.NOT_ACCEPTABLE);
      }
    }
    if (label) {
      const labelList = await this.labelService.findById(label);
      if (labelList.every((item) => item !== null)) {
        news.label = labelList;
      } else {
        throw new HttpException("标签不存在", HttpStatus.NOT_ACCEPTABLE);
      }
    }
    Object.entries(attr).forEach(([key, value]) => {
      news[key] = value;
    });
    await news.save();
    return news;
  }

  async remove(_id: string) {
    await this.newsModel.deleteOne({ _id });
  }
}
