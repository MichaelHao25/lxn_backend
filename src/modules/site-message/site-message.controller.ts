import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import parseResponse from "src/common/parseResponse";
import { CreateSiteMessageDto } from "./dto/create-site-message.dto";
import { UpdateSiteMessageDto } from "./dto/update-site-message.dto";
import { SiteMessageService } from "./site-message.service";

@Controller("site-message")
export class SiteMessageController {
  constructor(private readonly siteMessageService: SiteMessageService) {}

  @Post()
  create(@Body() createSiteMessageDto: CreateSiteMessageDto) {
    return this.siteMessageService.create(createSiteMessageDto);
  }

  @Get()
  findAll() {
    return this.siteMessageService.findAll();
  }

  @Get(":_id")
  findOne(@Param("_id") _id: string) {
    return this.siteMessageService.findOne(_id);
  }

  @Patch(":_id")
  update(
    @Param("_id") _id: string,
    @Body() updateSiteMessageDto: UpdateSiteMessageDto
  ) {
    return this.siteMessageService.update(_id, updateSiteMessageDto);
  }

  @Delete(":_id")
  async remove(@Param("_id") _id: string) {
    this.siteMessageService.remove(_id);
    return parseResponse("删除成功!");
  }
}
