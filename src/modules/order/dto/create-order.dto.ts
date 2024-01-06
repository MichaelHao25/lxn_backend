import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { IShopType } from './../entities/order.entity';

class GoodsList {
  @IsString()
  id: string;
  @IsString()
  sku: string;
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Min(1)
  count: number;
}
class ShopList {
  @IsString()
  id: string;
  @ValidateNested()
  @IsArray()
  @Type(() => GoodsList)
  goodsList: GoodsList[];
}
export class CreateOrderDto {
  @IsEnum(IShopType)
  type: IShopType;
  @ValidateNested()
  @IsArray()
  @Type(() => ShopList)
  shopList: ShopList[];
}
