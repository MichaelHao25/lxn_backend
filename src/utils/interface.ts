import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export interface IVvtoolResponse<T> {
  /**
   * 成功等于 0
   */
  code: number;
  msg: string;
  msec: number;
  time: number;
  data: T;
}
// {
//   code: 0,
//   msg: "查询成功",
//   msec: 41,
//   time: 1702307834,
//   data: {
//     access_token: "9ba2c7a2e2c6ba158cea238188132ff34c6275ef",
//     expires_in: 31104000,
//     token_type: "Bearer",
//     scope: "show",
//   },
// }

export interface IVvtoolAccessToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export class ParamsIdValidator {
  @IsString()
  @IsNotEmpty()
  _id: string;
}

export class ParamsUUIDValidator {
  @IsString()
  @IsUUID("all")
  uuid: string;
}
