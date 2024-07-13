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
import { Public } from "src/common/decorators/public.decorator";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { IResponseStructure } from "src/utils/interface";
import { CreateLabelDto } from "./dto/create-label.dto";
import { FindLabelDto } from "./dto/find-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";
import { LabelService } from "./label.service";

@Controller("label")
export class LabelController {
  constructor(private readonly labelService: LabelService) {}
  /**
   * 创建一个新的类型
   * @param createLabelDto
   * @returns
   */
  @Post()
  async create(@Body() createLabelDto: CreateLabelDto) {
    const res = await this.labelService.create(createLabelDto);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 查找类型
   * @param params
   * @returns
   */
  @Get()
  @Public()
  async findAll(@Query() query: FindLabelDto): Promise<IResponseStructure> {
    const res = await this.labelService.findAll(query);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 获取单个类型
   * @param _id
   * @returns
   */
  @Get(":_id")
  async findOne(@Param("_id") _id: string) {
    const res = await this.labelService.findOne(_id);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 更新类型
   * @param _id
   * @returns
   */
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateProduceLabelDto: UpdateLabelDto
  ) {
    const res = await this.labelService.update(_id, updateProduceLabelDto);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 删除类型
   * @param _id
   * @returns
   */
  @Delete(":_id")
  async remove(@Param("_id") _id: string): Promise<IResponseStructure<string>> {
    await this.labelService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功",
    });
  }
}
