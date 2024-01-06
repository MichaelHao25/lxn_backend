import * as fs from "node:fs";
/**
 * 创建文件夹
 * @returns true 创建成功
 * @returns false 创建失败
 */
export default async (location: string) => {
  return new Promise((resolve) => {
    fs.mkdir(location, { recursive: true }, (error) => {
      if (error) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};
