import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { TypeService } from "../type/type.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { FindNewsDto } from "./dto/find-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { News, NewsDocument } from "./entities/news.entity";

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<News>,
    private readonly typeService: TypeService
  ) {}
  /**
   * 创建一个新的产品
   * @param createNewsDto
   * @returns
   */
  async create(createNewsDto: CreateNewsDto): Promise<NewsDocument> {
    const news = new this.newsModel(createNewsDto);
    await news.save();
    return news;
  }

  async findAll(query: FindNewsDto) {
    const { current, pageSize, typeId, title } = query;
    const queryExpress = {
      ...(typeId ? { typeId } : {}),
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
    };
    const total = await this.newsModel.countDocuments(queryExpress);
    const res = await this.newsModel
      .find(queryExpress, {
        title: 1,
        _id: 1,
        mainPicture: 1,
        typeId: 1,
        updatedAt: 1,
        description: 1,
      })
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    const list = await Promise.all(
      res.map(async (item) => {
        const { typeId, _id, title, mainPicture, updatedAt, description } =
          item;
        const type = await this.typeService.findOne(typeId);
        return {
          _id,
          title,
          mainPicture,
          updatedAt,
          type: type.title,
          description,
        };
      })
    );
    return {
      page: {
        total,
        current,
        pageSize,
      },
      list,
    };
  }

  async findOne(_id: ObjectId): Promise<NewsDocument> {
    return await this.newsModel.findById(_id);
  }

  async update(
    _id: ObjectId,
    updateNewsDto: UpdateNewsDto
  ): Promise<NewsDocument> {
    const news = await this.newsModel.findById(_id);
    const { typeId, title, mainPicture, detailsPicture, description, details } =
      updateNewsDto;
    if (typeId) {
      news.typeId = typeId;
    }
    if (title) {
      news.title = title;
    }
    if (mainPicture) {
      news.mainPicture = mainPicture;
    }
    if (detailsPicture) {
      news.detailsPicture = detailsPicture;
    }
    if (description) {
      news.description = description;
    }
    if (details) {
      news.details = details;
    }
    await news.save();
    return news;
  }

  async remove(_id: ObjectId) {
    await this.newsModel.deleteOne({ _id });
  }
}
