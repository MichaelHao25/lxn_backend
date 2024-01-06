import { IResponseStructure } from "src/utils/interface";

/**
 * 构造一个标准的响应体
 */
export default <T = any>(
  params: Partial<IResponseStructure<T>>
): IResponseStructure<T> => {
  return {
    success: true,
    ...params,
  };
};
