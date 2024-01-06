export interface IResponse<T = any> {
  /**
   * 200 - success
   * 400 - bad request
   */
  statusCode?: number;
  /**
   * 数据
   */
  data?: T;
  /**
   * 消息
   */
  message?: string;
}
/**
 * 构造一个标准的响应体
 */
export default <T = any>(params: IResponse<T> | string): IResponse<T> => {
  if (typeof params === "string") {
    return {
      statusCode: 500,
      message: params,
    };
  }
  const { statusCode = 200, data, message } = params;
  return {
    statusCode,
    data,
    message,
  };
};
