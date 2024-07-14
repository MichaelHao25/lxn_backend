import { Injectable } from "@nestjs/common";
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { SavedMultipartFile } from "@fastify/multipart";
import { InjectModel } from "@nestjs/mongoose";
import OSS from "ali-oss";
import { Model } from "mongoose";
import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  ApiPrefix,
  CurrentProtocol,
  OssConfig,
  OssHeader,
  ServiceHost,
  getPort,
} from "src/constants";
import isFileExist from "src/modules/upload/utils/isFileExist";
import { CreateUploadDto } from "./dto/create-upload.dto";
import { Upload, UploadDocument } from "./entities/upload.entity";
import { IUpdateFile } from "./interface";
import copyFile from "./utils/copyFile";
import createDir from "./utils/createDir";

@Injectable()
export class UploadService {
  constructor(@InjectModel(Upload.name) private uploadModel: Model<Upload>) {}
  /**
   * 创建一条新的上传记录
   * @param createUploadDto
   * @returns 保存的文件记录
   */
  async create(createUploadDto: CreateUploadDto) {
    const newFile = new this.uploadModel(createUploadDto);
    await newFile.save();
    return newFile;
  }
  /**
   * 根据 _id 找到文件信息
   * @returns 文件的记录
   */
  async findOneById(_id: string): Promise<UploadDocument> {
    return await this.uploadModel.findById(_id);
  }

  /**
   * 根据本地文件位置找到存储的文件
   * @param fileLocation 本地文件位置
   * @returns 文件的记录
   */
  async findOneByFileLocation(fileLocation: string): Promise<UploadDocument> {
    const file = await this.uploadModel.findOne({ fileLocation });
    return file;
  }

  /**
   * 上传到本地磁盘
   * @param files 文件列表
   * @returns 返回文件路径列表
   */
  async updateToLocalDisk(files: SavedMultipartFile[]): Promise<IUpdateFile[]> {
    const urls = await Promise.all<IUpdateFile>(
      files.map((file) => {
        return new Promise(async (resolve) => {
          try {
            const readStream = fs.createReadStream(file.filepath);
            const hash = crypto.createHash("md5");
            readStream.on("data", (data) => {
              hash.update(data);
            });
            readStream.on("end", async () => {
              const md5 = hash.digest("hex");
              const ext = file.filepath.replace(/.+\./, "");
              const date = new Date();
              const reg = new RegExp(`.${ext}`);
              const fileName = file.filename.replace(reg, "");
              const mimetype = file.mimetype;

              const dir = path.join(
                __dirname,
                `../../asset/attachment/${date.getFullYear()}${date.getMonth()}${date.getDate()}`
              );
              const location = `${dir}/${md5}.${ext}`;

              // 1. 先判断文件存在否
              const isExist = await isFileExist(location);
              if (isExist) {
                /**
                 * 存在的话就找到文件id
                 */
                const res = await this.findOneByFileLocation(location);
                if (res) {
                  return resolve({
                    name: `${fileName}.${ext}`,
                    url: `${CurrentProtocol}://${ServiceHost}:${getPort()}/${ApiPrefix}upload/${
                      res._id
                    }`,
                  });
                }
                /**
                 * 如果没找到文件的话就进行覆盖
                 */
              }
              const isDirStatus = await new Promise(async (resolve) => {
                const isDirExist = await isFileExist(`${dir}/`);
                if (isDirExist) {
                  // 3. 文件夹存在的话就直接写入文件
                  //   console.log("文件夹存在");
                  //   console.log("准备写入文件");
                  return resolve(true);
                } else {
                  // 3. 文件夹不存在的话就开始创建
                  //   console.log("文件夹也不存在");
                  const isCreateDirStatus = await createDir(`${dir}/`);
                  if (isCreateDirStatus) {
                    // console.log("创建完毕");
                    // console.log("准备写入文件");
                    return resolve(true);
                  } else {
                    // console.log("创建失败");
                    return resolve("文件上传失败，请重试");
                  }
                }
              });
              if (isDirStatus !== true) {
                return resolve(isDirStatus);
              } else {
                const copyStatus = await copyFile({
                  originLocation: file.filepath,
                  targetLocation: location,
                });
                if (copyStatus) {
                  const res = await this.create({
                    fileExt: ext,
                    fileLocation: location,
                    fileName,
                    mimetype,
                  });
                  if (res) {
                    return resolve({
                      name: `${fileName}.${ext}`,
                      url: `${CurrentProtocol}://${ServiceHost}:${getPort()}/${ApiPrefix}upload/${
                        res._id
                      }`,
                    });
                  }
                }
              }

              return resolve({
                errorMessage: "文件上传失败，请重试",
              });
            });
          } catch (error) {
            //   console.log("未知错误");
            return resolve({
              errorMessage: "该文件发生了未知错误，请重试",
            });
          }
        });
      })
    );
    return urls;
  }

  /**
   * 上传到oss
   * @return 返回文件路径列表
   */
  async uploadOss(files: SavedMultipartFile[]): Promise<IUpdateFile[]> {
    const client = new OSS(OssConfig);
    /**
     * oss-----
     */
    const urls = await Promise.all<IUpdateFile>(
      files.map((file) => {
        return new Promise(async (resolve) => {
          const readStream = fs.createReadStream(file.filepath);
          const hash = crypto.createHash("md5");
          readStream.on("data", (data) => {
            hash.update(data);
          });
          readStream.on("end", async () => {
            const md5 = hash.digest("hex");
            const ext = file.filepath.replace(/.+\./, "");
            const result = await client.put(`${md5}.${ext}`, file.filepath, {
              headers: OssHeader,
            });
            resolve({ url: result.url });
          });
        });
      })
    );
    return urls;
  }
}
