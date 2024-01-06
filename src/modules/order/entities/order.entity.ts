import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum IShopType {
  /**
   * 因为不支持数字开头，所以使用下划线代替
   * 1688
   */
  "_1688" = "1688",
  /**
   * 淘宝
   */
  "TB" = "TB",
}
/**
 * 一个商场
 */
export interface IMallItem {
  /**
   * 商场类型
   */
  type: IShopType;
  /**
   * 这个商店列表
   */
  shopList: {
    /**
     * 商店id
     */
    id: string;
    /**
     * 这个店铺下的商品列表
     */
    goodsList: [
      {
        /**
         * 商品id
         */
        id: string;
        /**
         * 商品sku
         */
        sku: string;
        /**
         * 数量
         */
        count: number;
      },
    ];
  }[];
}
export type OrderDocument = HydratedDocument<Order>;
/**
 * 订单信息
 */
@Schema({
  timestamps: {
    updatedAt: "updateAt",
  },
})
export class Order {
  /**
   * 商品列表
   */
  @Prop({ required: true })
  mallList: IMallItem[];
  /**
   * 更新时间
   */
  @Prop({ default: Date.now })
  updateAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
