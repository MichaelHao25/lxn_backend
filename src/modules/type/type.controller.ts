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
import { IResponseStructure } from "src/interface";
import { CreateTypeDto } from "./dto/create-type.dto";
import { FindTypeDto } from "./dto/find-type.dto";
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
    const res = await this.typeService.findAll(query);
    return parseSuccessResponse({ data: res });
  }
  /**
   * 根据 id 获取单个类型
   * @param _id
   * @returns
   */
  @Get(":_id")
  async findOne(@Param("_id") _id: string) {
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
    @Param("_id") _id: string,
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
  async remove(@Param("_id") _id: string): Promise<IResponseStructure<string>> {
    await this.typeService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功",
    });
  }
}
