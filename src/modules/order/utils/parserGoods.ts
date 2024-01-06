/**
 * 商品标题
 */
type ITitle = string;
/**
 * 商品Id
 */
type IGoodsId = string;
/**
 * 主图
 */
type IMainPicture = string;
/**
 * 商品地址
 */
type IGoodsLink = string;
/**
 * Sku 信息
 */
type ISkuInfo = Record<string, string>;
/**
 * Sku Id
 */
type ISkuId = string;
/**
 * 商品数量
 */
type ICount = number;
/**
 * 单价
 */
type IPrice = string;
/**
 * 总价
 */
type ITotalPrice = string;
/**
 * 卖家名称
 */
type INickName = string;
/**
 * 商店名称
 */
type IShopName = string;
export type ITypeReturn = [
  ITitle,
  IGoodsId,
  IMainPicture,
  IGoodsLink,
  ISkuInfo,
  ISkuId,
  ICount,
  IPrice,
  ITotalPrice,
  INickName,
  IShopName,
];

/**
 * 将商品格式化为插件所需要的格式
 */
export default (details: any = {}, count: number, sku: string) => {
  // 目标数据格式：["2023春季女装时尚韩版拼色条纹钩花V领单排扣长袖显瘦短款针织衫", "695036808283", "https://img.alicdn.com/bao/uploaded/i1/445530705/O1CN0116N2Mh1H4w1hz6ofV_!!445530705.jpg", "//item.taobao.com/item.htm?id=695036808283", { "颜色分类": "绿色条纹", "尺码": "M" }, "4933232180624", 1, "18.60", "18.60", "楚楚床上用品", "月亮外贸女装批发", "//store.taobao.com/shop/view_shop.htm?user_number_id=2216703668010"]
  // const row = [
  //   /**
  //    * 标题
  //    */
  //   '2023春季女装时尚韩版拼色条纹钩花V领单排扣长袖显瘦短款针织衫',
  //   /**
  //    * 商品id
  //    */
  //   '695036808283',
  //   /**
  //    * 主图
  //    */
  //   'https://img.alicdn.com/bao/uploaded/i1/445530705/O1CN0116N2Mh1H4w1hz6ofV_!!445530705.jpg',
  //   /**
  //    * 商品链接
  //    */
  //   '//item.taobao.com/item.htm?id=695036808283',
  //   /**
  //    * skuBase
  //    */
  //   { 颜色分类: '绿色条纹', 尺码: 'M' },
  //   /**
  //    * sku id
  //    */
  //   '4933232180624',
  //   /**
  //    * 数量
  //    */
  //   1,
  //   /**
  //    * 单价
  //    */
  //   '18.60',
  //   /**
  //    * 总价
  //    */
  //   '18.60',
  //   /**
  //    sellerNick/fbt2User
  //    fbt2_user / seller_nick
  //    */
  //   '楚楚床上用品',
  //   /**
  //    * 店铺名称
  //    */
  //   '月亮外贸女装批发',
  //   /**
  //    * 店铺地址
  //    */
  //   '//store.taobao.com/shop/view_shop.htm?user_number_id=2216703668010',
  // ];
  const { item, sku_base = {}, mock_data = {}, seller = {} } = details;
  const skuItem = sku_base.skus.find((item) => item.sku_id === sku);
  const skuList = skuItem.prop_path.split(';');
  const skuBase = {};
  let mainPicture = `${item?.images[0]}`;
  skuList.forEach((item) => {
    const [key, value] = item.split(':');
    const pidItem = sku_base.props.find((item2) => {
      if (item2.pid === key) {
        return true;
      }
    });
    pidItem?.values.find((item3) => {
      if (item3.vid === value) {
        skuBase[pidItem.name] = item3.name;
        if (item3.image) {
          mainPicture = item3.image.replace(/http[s]*:/, '');
        }
        return true;
      }
    });
  });
  /**
   * 价格单位为分
   */
  const price = mock_data?.skuCore?.sku2info?.[sku]['price']?.priceMoney;

  return [
    /**
     * 标题
     */
    item?.title,
    /**
     * 商品id
     */
    item?.item_id,
    /**
     * 主图
     */
    mainPicture,
    /**
     * 商品链接
     */
    `//item.taobao.com/item.htm?id=${item?.item_id}`,
    /**
     * skuBase
     */
    skuBase,
    /**
     * sku id
     */
    sku,
    /**
     * 数量
     */
    count,
    /**
     * 单价
     */
    (price / 100).toString(),
    /**
     * 总价
     */
    ((price * count) / 100).toString(),
    /**
      sellerNick/fbt2User
      fbt2_user / seller_nick
      */
    seller?.fbt2_user,
    /**
     * 店铺名称
     */
    seller?.shop_name,
    /**
     * 店铺地址
     */
    `//store.taobao.com/shop/view_shop.htm?user_number_id=${seller?.user_id}`,
  ];
};
