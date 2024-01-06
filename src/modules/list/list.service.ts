import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICreateReturn } from "../vvtool/vvtool.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { List, ListDocument } from "./entities/list.entity";

export interface IGetDetails extends ICreateReturn {
  id: string;
}
@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}
  async create(createListDto: CreateListDto) {
    const createList = new this.listModel(createListDto);
    await createList.save();
    return createList;
  }

  async findAll(): Promise<ListDocument[]> {
    const res = await this.listModel.find().exec();
    return res;
  }

  async findOne(id: string): Promise<ListDocument> {
    return await this.listModel.findOne({ id });
  }

  async update(
    id: string,
    updateListDto: UpdateListDto
  ): Promise<ListDocument> {
    const { details } = updateListDto;
    if (details) {
      return await this.listModel.findOneAndUpdate({ id }, { details });
    }
  }

  async remove(id: string) {
    await this.listModel.deleteOne({ id });
  }
  /**
   * 获取商品详情
   */
  async getDetails(props: IGetDetails): Promise<Record<string, any>> {
    const { id, accessToken, tokenType } = props;
    const response = await fetch(
      `http://api.vv-tool.com/tool/accounts/item-info-low-price?url=${id}&type=${1}`,
      {
        method: "GET",
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      }
    ).then((res) => res.json());
    if (response.code === 0) {
      if (response.data && Object.keys(response.data).length !== 0) {
        const { mock_data = "{}", api_stack = [] } = response.data;
        response.data.mock_data = JSON.parse(mock_data);
        response.data.api_stack = api_stack.map((item) => {
          const { value = "{}" } = item;
          return {
            ...item,
            value: JSON.parse(value),
          };
        });
        return response.data;
      }
    }
    throw new HttpException(
      "获取数据发生异常",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
