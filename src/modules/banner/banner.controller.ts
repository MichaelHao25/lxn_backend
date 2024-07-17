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
import { BannerService } from "./banner.service";
import { CreateBannerDto } from "./dto/create-banner.dto";
import { FindBannerDto } from "./dto/find-banner.dto";
import { UpdateBannerDto } from "./dto/update-banner.dto";

@Controller("banner")
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  async create(@Body() createBannerDto: CreateBannerDto) {
    const res = await this.bannerService.create(createBannerDto);
    return parseSuccessResponse({ data: res });
  }

  @Get()
  async findAll(@Query() query: FindBannerDto) {
    const res = await this.bannerService.findAll(query);
    return parseSuccessResponse({ data: res });
  }

  @Get(":_id")
  async findOne(@Param("_id") _id: string) {
    const res = await this.bannerService.findOne(_id);
    return parseSuccessResponse({ data: res });
  }

  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateBannerDto: UpdateBannerDto
  ) {
    const res = await this.bannerService.update(_id, updateBannerDto);
    return parseSuccessResponse({ data: res });
  }

  @Delete(":_id")
  async remove(@Param("_id") _id: string) {
    await this.bannerService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功",
    });
  }
}
