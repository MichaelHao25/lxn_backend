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
import { IResponseStructure } from "src/utils/interface";
import { CreateTypeDto } from "./dto/create-type.dto";
import { FindTypeDto, IProductOneLevelType } from "./dto/find-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { TypeService } from "./type.service";

@Controller("type")
export class TypeController {
  constructor(private readonly typeService: TypeService) {}
  /**
   * 创建一个新的类型
   * @param createTypeDto
   * @returns
   */
  @Post()
  async create(@Body() createTypeDto: CreateTypeDto) {
    const res = await this.typeService.create(createTypeDto);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 查找类型
   * @param params
   * @returns
   */
  @Get()
  @Public()
  async findAll(@Query() query: FindTypeDto): Promise<IResponseStructure> {
    const { type } = query;
    if (
      [IProductOneLevelType.product, IProductOneLevelType.news].includes(type)
    ) {
      const res = await this.typeService.findAll({
        type,
      });
      return parseSuccessResponse({ data: res });
    }
    const res = await this.typeService.findAll();
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 获取单个类型
   * @param _id
   * @returns
   */
  @Get(":_id")
  async findOne(@Param("_id") _id: ObjectId) {
    const res = await this.typeService.findOne(_id);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 更新类型
   * @param _id
   * @returns
   */
  @Patch(":_id")
  async update(
    @Param("_id") _id: ObjectId,
    @Body() updateProduceTypeDto: UpdateTypeDto
  ) {
    const res = await this.typeService.update(_id, updateProduceTypeDto);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 删除类型
   * @param _id
   * @returns
   */
  @Delete(":_id")
  async remove(
    @Param("_id") _id: ObjectId
  ): Promise<IResponseStructure<string>> {
    await this.typeService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功",
    });
  }
}
