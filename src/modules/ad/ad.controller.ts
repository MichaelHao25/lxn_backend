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
    return parseSuccessResponse({ data: res });
  }
  /**
   * 查询详情
   * @returns
   */
  @Get(":_id")
  async findOne(@Param("_id") _id: string) {
    const res = await this.adService.findOne(_id);
    return parseSuccessResponse({ data: res });
  }

  /**
   * 更新
   * @param id
   * @param updateAdDto
   * @returns
   */
  @Patch(":_id")
  async update(@Param("_id") _id: string, @Body() updateAdDto: UpdateAdDto) {
    const res = await this.adService.update(_id, updateAdDto);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 删除
   * @param id
   * @returns
   */
  @Delete(":_id")
  async remove(@Param("_id") _id: string) {
    await this.adService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功",
    });
  }
}
