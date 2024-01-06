import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import xlsx from 'node-xlsx';
import parseResponse from 'src/common/parseResponse';
import { ParamsIdValidator } from 'src/utils/interface';
import { ListService } from '../list/list.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IShopType, Order } from './entities/order.entity';
import parsePluginHtml from './utils/parsePluginHtml';
import parserGoods from './utils/parserGoods';
import parserMallList, { IMergeGoodsList } from './utils/parserMallList';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly listService: ListService,
  ) { }
  /**
   * 创建一个订单
   * @param createOrderDto
   * @returns
   */
  async create(createOrderDto: CreateOrderDto[]) {
    if (createOrderDto.length !== 1) {
      return parseResponse({
        statusCode: 500,
        message: '单次只能提交一个商城的商品',
      });
    }
    const goodsList = parserMallList(createOrderDto);
    const res = await Promise.all<IMergeGoodsList | true>(
      goodsList.map((goods) => {
        return new Promise(async (resolve) => {
          const { id, sku } = goods;

          const goodsDetails = await this.listService.findOne(id);
          if (goodsDetails) {
            const { type = IShopType.TB, details } = goodsDetails;
            if (type === goodsDetails.type) {
              try {
                const sku2Info = details?.mock_data?.skuCore?.sku2info;
                if (sku2Info[sku] !== undefined) {
                  resolve(true);
                }
              } catch (error) {
                console.log(error);
              }
            }
          }
          resolve(goods);
        });
      }),
    );
    const errorGoods = res.filter<IMergeGoodsList>(
      (item): item is IMergeGoodsList => item !== true,
    );
    if (errorGoods.length !== 0) {
      return parseResponse({
        statusCode: 404,
        data: errorGoods,
        message: '商品不存在',
      });
    }
    const order = new this.orderModel({ mallList: createOrderDto });
    await order.save();
    return parseResponse({
      data: order.id,
      message: '订单创建成功',
    });
  }
  async getFile(@Param() params: ParamsIdValidator): Promise<string> {
    const { id } = params;
    const { mallList = [] } = (await this.orderModel.findById(id)) || {};
    if (mallList.length > 1) {
      return parsePluginHtml([], id);
    }
    const goodsList = parserMallList(mallList);
    /**
     * 找到所有的商品
     */
    const list = await Promise.all(
      goodsList.map(async (item) => {
        const { id, count, sku } = item;
        const goods = await this.listService.findOne(id);
        if (goods) {
          const { details } = goods;
          return parserGoods(details, count, sku);
        } else {
          console.log(`${id}订单商品${id}不存在`);
        }
      }),
    );
    return parsePluginHtml(list, id);
  }
  async getExcel(@Param() params: ParamsIdValidator): Promise<Buffer> {
    const { id } = params;
    const data: any[] = [];
    /**
     * 序列	图	标题同时也是链接	规格	单价	数量	合计	运费这个不用抓取
     */
    data.push([
      'စဉ်',
      'ပုံ',
      'စာသား',
      'ဆိုဒ်အရောင်ဒီဇိုင်း',
      'ဈေးနှုန်း',
      'အရေ တွက်',
      'စုစုပေါင်း',
      'ကားခ',
    ]);
    const { mallList = [] } = (await this.orderModel.findById(id)) || {};
    if (mallList.length > 1) {
      return xlsx.build([{ name: 'sheet1', data, options: {} }]);
    }
    const goodsList = parserMallList(mallList);
    /**
     * 找到所有的商品
     */
    const list = await Promise.all(
      goodsList.map(async (item) => {
        const { id, count, sku } = item;
        const goods = await this.listService.findOne(id);
        if (goods) {
          const { details } = goods;
          return parserGoods(details, count, sku);
        } else {
          console.log(`${id}订单商品${id}不存在`);
        }
      }),
    );
    list.forEach((item, index) => {
      data.push([
        index + 1,
        {
          v: '',
          t: 's',
        },
        {
          t: 's',
          v: item[0],
          l: {
            Target: `https://${item[3]}`,
            Tooltip: `${item[0]}`,
          },
        },
        JSON.stringify(item[4]),
        item[7],
        item[6],
        item[8],
        '',
      ]);
    });
    return xlsx.build([
      {
        name: 'sheet1',
        data,
        options: {
          '!cols': [
            {
              wpx: 23,
            },
            {
              wpx: 15,
            },
            {
              wpx: 340,
            },
            {
              wpx: 100,
            },
            {
              wpx: 50,
            },
            {
              wpx: 65,
            },
            {
              wpx: 50,
            },
          ],
          '!rows': [
            {
              hpx: 30,
            },
          ],
        },
      },
    ]);
  }

  findAll() {
    return `This action returns all Order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} Order`;
  }

  remove(id: number) {
    return `This action removes a #${id} Order`;
  }
}
