/**
 * 上传文件的返回值
 */
export interface IUpdateFile {
  /**
   * 文件地址
   */
  url?: string;
  /***
   * 资源名称
   */
  name?: string;
  /**
   * 错误消息
   */
  errorMessage?: string;
}
