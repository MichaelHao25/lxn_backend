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
import { CreateSiteMessageDto } from "./dto/create-site-message.dto";
import { UpdateSiteMessageDto } from "./dto/update-site-message.dto";
import { SiteMessageService } from "./site-message.service";

@Controller("site-message")
export class SiteMessageController {
  constructor(private readonly siteMessageService: SiteMessageService) {}

  @Post()
  async create(@Body() createSiteMessageDto: CreateSiteMessageDto) {
    const res = this.siteMessageService.create(createSiteMessageDto);
    return parseSuccessResponse({ data: res });
  }

  @Get()
  async findAll() {
    const res = this.siteMessageService.findAll();
    return parseSuccessResponse({ data: res });
  }

  @Get(":_id")
  async findOne(@Param("_id") _id: string) {
    const res = await this.siteMessageService.findOne(_id);
    return parseSuccessResponse({ data: res });
  }

  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateSiteMessageDto: UpdateSiteMessageDto
  ) {
    const res = await this.siteMessageService.update(_id, updateSiteMessageDto);
    return parseSuccessResponse({ data: res });
  }

  @Delete(":_id")
  async remove(@Param("_id") _id: string) {
    await this.siteMessageService.remove(_id);
    return parseSuccessResponse({ data: "删除成功!" });
  }
}
