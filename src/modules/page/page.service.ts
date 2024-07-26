import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TypeService } from "../type/type.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { Page, PageDocument } from "./entities/page.entity";
import { IGlobalConfig } from "./interface";
interface IFindConfig {
  type: IGlobalConfig;
}
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,
    private readonly typeService: TypeService
  ) {}

  async create(createPageDto: CreatePageDto) {
    const { indexShowType, defaultNewImage, defaultProductImage, type } =
      createPageDto;
    const page = await new Promise<PageDocument>(async (resolve) => {
      const res = await this.findConfig({ type });
      if (res) {
        return resolve(res);
      }
      const page = new this.pageModel();
      page.type = type;
      return resolve(page);
    });
    switch (type) {
      case IGlobalConfig.defaultNewImgConfig:
        if (!defaultNewImage) {
          throw new HttpException("必填参数缺失;", HttpStatus.BAD_REQUEST);
        }
        page.defaultNewImage = defaultNewImage;
        break;
      case IGlobalConfig.defaultProductImgConfig:
        if (!defaultProductImage) {
          throw new HttpException("必填参数缺失;", HttpStatus.BAD_REQUEST);
        }
        page.defaultProductImage = defaultProductImage;
        break;
      case IGlobalConfig.indexSortConfig:
        if (!indexShowType) {
          throw new HttpException("必填参数缺失;", HttpStatus.BAD_REQUEST);
        }
        const list = await this.typeService.findById(indexShowType);
        if (list.every((item) => item === null)) {
          throw new HttpException("id错误", HttpStatus.BAD_REQUEST);
        }
        page.indexShowType = list;
        break;
    }
    await page.save();
    return page;
  }

  async findConfig(props: IFindConfig) {
    const { type } = props;
    switch (type) {
      case IGlobalConfig.defaultNewImgConfig:
        return await this.pageModel.findOne({ type });
      case IGlobalConfig.defaultProductImgConfig:
        return await this.pageModel.findOne({ type });
      case IGlobalConfig.indexSortConfig:
        return await this.pageModel.findOne({ type }).populate("indexShowType");
    }
  }

  async update(type: IGlobalConfig, updatePageDto: UpdatePageDto) {
    const item = await this.findConfig({ type });
    Promise.all(
      (Object.entries(updatePageDto) as Entries<UpdatePageDto>).map(
        async ([key, value]) => {
          switch (key) {
            case "indexShowType":
              const list = await this.typeService.findById(value);
              if (list.every((item) => item === null)) {
                throw new HttpException("id错误", HttpStatus.BAD_REQUEST);
              }
              item[key] = list;
              break;
            default:
              item[key] = value;
              break;
          }
        }
      )
    );
    await item.save();
    return item;
  }

  remove(_id: string) {
    return `This action removes a #${_id} page`;
  }
}
