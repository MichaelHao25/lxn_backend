import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { Query, Req, Res } from "@nestjs/common/decorators";
import { FastifyReply, FastifyRequest } from "fastify";
import * as fs from "node:fs";
import { Public } from "src/common/decorators/public.decorator";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { ParamsIdValidator } from "src/interface";
import { IUpdateFile } from "./interface";
import { UploadService } from "./upload.service";
// const pump = util.promisify(stream.pipeline);
/**
 * oss-----
 */

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * 显示单个文件
   * @param _id 文件_id
   * @param download 是否下载文件
   * @param res request
   * @returns 返回这个文件或者异常
   */
  @Get(":_id")
  @Public()
  async findOne(
    @Param() params: ParamsIdValidator,
    @Res() res: FastifyReply,
    @Query("download") download?: string
  ) {
    const { _id } = params;
    const file = await this.uploadService.findOneById(_id);
    if (file) {
      res.header(
        "Content-Disposition",
        `${
          download !== undefined ? "attachment" : "inline"
        };filename=${encodeURIComponent(file.fileName)}.${file.fileExt}`
      );
      res.send(fs.createReadStream(file.fileLocation));
    }
    return new HttpException("文件不存在", HttpStatus.NOT_FOUND);
  }
  /**
   * 上传文件
   * @param req 请求
   * @param res 详情
   * @returns 返回上传文件的文件路径
   */
  @Post()
  async upload(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    /**
     * oss-----
     */

    const files = await req.saveRequestFiles();
    const list = await this.uploadService.uploadOss(files);
    res.send(
      parseSuccessResponse<IUpdateFile[]>({
        data: list,
      })
    );
  }
}
