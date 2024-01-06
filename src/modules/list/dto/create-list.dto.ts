import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IShopType } from 'src/modules/order/entities/order.entity';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsEnum(IShopType)
  type: IShopType;
  @IsNotEmpty()
  details: Record<string, any>;
}
