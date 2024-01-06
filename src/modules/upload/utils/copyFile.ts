import * as fs from "node:fs";
interface ICopyFile {
  originLocation: string;
  targetLocation: string;
}
/**
 * 使用管道复制文件
 */
export default async (props: ICopyFile): Promise<boolean> => {
  return new Promise((resolve) => {
    const { originLocation, targetLocation } = props;
    fs.createReadStream(originLocation)
      .pipe(fs.createWriteStream(targetLocation))
      .on("finish", () => {
        resolve(true);
      })
      .on("error", (error) => {
        resolve(false);
      });
  });
};
