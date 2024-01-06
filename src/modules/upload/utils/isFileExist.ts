import * as fs from "node:fs";
/**
 * 判断文件是否存在返回真就存在假就不存在
 * @returns true 文件存在
 * @returns false 文件不存在
 */
export default async (location: string): Promise<boolean> =>
  await new Promise<boolean>((resolve) => {
    fs.access(location, fs.constants.F_OK, (error) => {
      if (error) {
        resolve(false);
        return;
      }
      resolve(true);
      return;
    });
  });
