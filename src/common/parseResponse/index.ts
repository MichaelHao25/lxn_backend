// 错误处理方案： 错误类型
export enum IErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
export interface IResponseStructure<T> {
  success: boolean;
  data?: T;
  errorCode?: number;
  errorMessage?: string;
  showType?: IErrorShowType;
}
/**
 * 构造一个标准的响应体
 */
export default <T = any>(
  params: IResponseStructure<T> | string
): IResponseStructure<T> => {
  if (typeof params === "string") {
    return {
      success: false,
      errorCode: 500,
      errorMessage: params,
    };
  }
  const { data } = params;
  return {
    success: true,
    data,
  };
};
