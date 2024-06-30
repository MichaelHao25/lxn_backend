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
import { Public } from "src/common/decorators/public.decorator";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { ContactUsService } from "./contact-us.service";
import { CreateContactUsDto } from "./dto/create-contact-us.dto";
import { FindContactUsDto } from "./dto/find-contact-us.dto";
import { UpdateContactUsDto } from "./dto/update-contact-us.dto";

@Controller("contact-us")
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  /**
   * 新增
   */
  @Post()
  @Public()
  async create(@Body() createContactUsDto: CreateContactUsDto) {
    const res = await this.contactUsService.create(createContactUsDto);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 获取所有
   */
  @Get()
  async findAll(@Query() query: FindContactUsDto) {
    const res = await this.contactUsService.findAll(query);
    return parseSuccessResponse({ data: res });
  }

  /**
   * 根据id查询详情
   */
  @Get(":_id")
  async findOne(@Param("_id") _id: ObjectId) {
    const res = await this.contactUsService.findOne(_id);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据id更新数据
   */
  @Patch(":_id")
  async update(
    @Param("_id") _id: ObjectId,
    @Body() updateContactUsDto: UpdateContactUsDto
  ) {
    const res = await this.contactUsService.update(_id, updateContactUsDto);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据id删除
   */
  @Delete(":_id")
  async remove(@Param("_id") _id: ObjectId) {
    await this.contactUsService.remove(_id);
    return parseSuccessResponse({ data: "删除成功!" });
  }
}
