import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ObjectId } from "mongoose";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { AdService } from "./ad.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { FindAdDto } from "./dto/find-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

@Controller("ad")
export class AdController {
  constructor(private readonly adService: AdService) {}

  /**
   * 创建
   * @param createAdDto
   * @returns
   */
  @Post()
  async create(@Body() createAdDto: CreateAdDto) {
    const res = await this.adService.create(createAdDto);
    return parseSuccessResponse({ data: res });
  }

  /**
   * 获取所有
   * @returns
   */
  @Get()
  async findAll(@Query() query: FindAdDto) {
    const res = await this.adService.findAll(query);
    return parseSuccessResponse(res);
  }
  /**
   * 查询详情
   * @returns
   */
  @Get(":_id")
  findOne(@Param("_id") _id: ObjectId) {
    return this.adService.findOne(_id);
  }

  /**
   * 更新
   * @param id
   * @param updateAdDto
   * @returns
   */
  @Patch(":_id")
  update(@Param("_id") _id: ObjectId, @Body() updateAdDto: UpdateAdDto) {
    return this.adService.update(_id, updateAdDto);
  }
  /**
   * 删除
   * @param id
   * @returns
   */
  @Delete(":_id")
  remove(@Param("_id") _id: ObjectId) {
    return this.adService.remove(_id);
  }
}
