import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductTypeService } from "../product-type/product-type.service";
import { CreateNewsListDto } from "./dto/create-news-list.dto";
import { FindNewsListDto } from "./dto/find-news-list.dto";
import { UpdateNewsListDto } from "./dto/update-news-list.dto";
import { NewsList, NewsListDocument } from "./entities/news-list.entity";

@Injectable()
export class NewsListService {
  constructor(
    @InjectModel(NewsList.name) private newsListModel: Model<NewsList>,
    private readonly productTypeService: ProductTypeService
  ) {}
  /**
   * 创建一个新的产品
   * @param createNewsListDto
   * @returns
   */
  async create(
    createNewsListDto: CreateNewsListDto
  ): Promise<NewsListDocument> {
    const news = new this.newsListModel(createNewsListDto);
    await news.save();
    return news;
  }

  async findAll(query: FindNewsListDto) {
    const { current, pageSize, typeId, title } = query;
    const queryExpress = {
      ...(typeId ? { typeId } : {}),
      ...(title
        ? {
            title: { $regex: title },
          }
        : {}),
    };
    const total = await this.newsListModel.countDocuments(queryExpress);
    const res = await this.newsListModel
      .find(queryExpress, {
        title: 1,
        _id: 1,
        mainPicture: 1,
        typeId: 1,
        updatedAt: 1,
      })
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    const list = await Promise.all(
      res.map(async (item) => {
        const { typeId, _id, title, mainPicture, updatedAt, description } =
          item;
        const type = await this.productTypeService.findOne(typeId);
        return {
          _id,
          title,
          mainPicture,
          updatedAt,
          typeName: type.typeName,
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

  async findOne(_id: string): Promise<NewsListDocument> {
    return await this.newsListModel.findById(_id);
  }

  async update(
    _id: string,
    updateNewsListDto: UpdateNewsListDto
  ): Promise<NewsListDocument> {
    const news = await this.newsListModel.findById(_id);
    const { typeId, title, mainPicture, detailsPicture, description, details } =
      updateNewsListDto;
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

  async remove(_id: string) {
    await this.newsListModel.deleteOne({ _id });
  }
}
