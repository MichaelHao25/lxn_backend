import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LabelService } from "../label/label.service";
import { PageService } from "../page/page.service";
import { TypeService } from "../type/type.service";
import { IGlobalConfig } from "./../page/interface";
import { CreateNewsDto } from "./dto/create-news.dto";
import { FindNewsDto } from "./dto/find-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { News, NewsDocument } from "./entities/news.entity";

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<News>,
    private readonly typeService: TypeService,
    private readonly labelService: LabelService,
    private readonly pageService: PageService
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
      .find(queryExpress)
      .limit(pageSize)
      .skip((current - 1) * pageSize)
      .sort({ order: -1 })
      .populate("type")
      .populate("label");
    const res = await this.pageService.findConfig({
      type: IGlobalConfig.defaultNewImgConfig,
    });
    const parseList = list.map((item) => {
      if (item.mainPictureUrl === undefined) {
        if (res.defaultNewImage) {
          item.mainPictureUrl = res.defaultNewImage;
        }
      }
      return item;
    });
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list: parseList,
    };
  }

  async findOne(_id: string): Promise<NewsDocument> {
    const res = await this.pageService.findConfig({
      type: IGlobalConfig.defaultNewImgConfig,
    });
    const item = await this.newsModel
      .findById(_id)
      .populate("type")
      .populate("label");
    if (item.mainPictureUrl === undefined) {
      if (res.defaultNewImage) {
        item.mainPictureUrl = res.defaultNewImage;
      }
    }
    return item;
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
