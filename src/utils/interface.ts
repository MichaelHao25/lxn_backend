import { IsNotEmpty, IsString, IsUUID } from "class-validator";

// export interface IVvtoolResponse<T> {
//   /**
//    * 成功等于 0
//    */
//   code: number;
//   msg: string;
//   msec: number;
//   time: number;
//   data: T;
// }
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

// 错误处理方案： 错误类型
export enum IErrorShowType {
  /**
   * 静默
   */
  SILENT = 0,
  /**
   * 警告消息
   */
  WARN_MESSAGE = 1,
  /**
   * 错误消息
   */
  ERROR_MESSAGE = 2,
  /**
   * 通知消息
   */
  NOTIFICATION = 3,
  /**
   * 重定向
   */
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
export interface IResponseStructure<T = any> {
  /**
   * 是否成功
   */
  success: boolean;
  /**
   * 返回的数据
   */
  data?: T;
  /**
   * 错误代码
   */
  errorCode?: number;
  /**
   * 错误的消息
   */
  errorMessage?: string;
  /**
   * 显示类型
   */
  showType?: IErrorShowType;
}
