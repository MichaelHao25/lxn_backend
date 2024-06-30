import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { BannerService } from "./banner.service";
import { CreateBannerDto } from "./dto/create-banner.dto";
import { UpdateBannerDto } from "./dto/update-banner.dto";

@Controller("banner")
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  async create(@Body() createBannerDto: CreateBannerDto) {
    const res = await this.bannerService.create(createBannerDto);
    return parseSuccessResponse(res);
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bannerService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(+id, updateBannerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bannerService.remove(+id);
  }
}
