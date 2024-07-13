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
  findAll(@Query() query: FindBannerDto) {
    return this.bannerService.findAll(query);
  }

  @Get(":_id")
  findOne(@Param("_id") _id: string) {
    return this.bannerService.findOne(_id);
  }

  @Patch(":_id")
  update(@Param("_id") _id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(_id, updateBannerDto);
  }

  @Delete(":_id")
  remove(@Param("_id") _id: string) {
    return this.bannerService.remove(_id);
  }
}
