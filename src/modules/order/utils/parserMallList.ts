import { CreateOrderDto } from '../dto/create-order.dto';
import { IMallItem, IShopType } from '../entities/order.entity';
/**
 * 将订单商品拍平成二维数组
 */
export interface IMergeGoodsList {
  type: IShopType;
  id: string;
  sku: string;
  count: number;
}
/**
 * 将订单商品拍平成二维数组
 */
export default (
  createOrderDto: (IMallItem | CreateOrderDto)[],
): IMergeGoodsList[] => {
  {
    const mallList = createOrderDto.map((item) => {
      const { type, shopList } = item;
      return {
        type,
        list: shopList
          .map((item) => {
            return item.goodsList.map((item) => item);
          })
          .flat(2),
      };
    });
    const goodsList = mallList
      .map((item) => {
        const { list, type } = item;
        return list.map((item) => {
          return { ...item, type };
        });
      })
      .flat(2);
    return goodsList;
  }
};
