import { IResponseStructure } from "src/utils/interface";

/**
 * 构造一个标准的响应体
 */
export default <T = any>(
  params: Partial<IResponseStructure<T>> | string
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
