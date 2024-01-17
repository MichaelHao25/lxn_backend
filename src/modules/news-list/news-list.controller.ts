import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { IResponseStructure } from "src/utils/interface";
import { ProductTypeService } from "../product-type/product-type.service";
import { CreateNewsListDto } from "./dto/create-news-list.dto";
import { FindNewsListDto } from "./dto/find-news-list.dto";
import { UpdateNewsListDto } from "./dto/update-news-list.dto";
import { NewsListService } from "./news-list.service";

@Controller("news-list")
export class NewsListController {
  constructor(
    private readonly newsListService: NewsListService,
    private readonly productTypeService: ProductTypeService
  ) {}
  /**
   * 创建一个新的产品
   */
  @Post()
  async create(@Body() createNewsListDto: CreateNewsListDto) {
    const { typeId } = createNewsListDto;
    const type = await this.productTypeService.findOne(typeId);
    if (type) {
      const res = await this.newsListService.create(createNewsListDto);
      return parseSuccessResponse({ data: res });
    } else {
      throw new HttpException("类型不存在", HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get()
  /**
   * 查询所有的产品
   */
  async findAll(@Query() query: FindNewsListDto) {
    const res = await this.newsListService.findAll(query);
    return parseSuccessResponse({ data: res });
  }

  @Get(":_id")
  /**
   * 获取单个产品
   * @summary 测试
   * @description 测试描述
   */
  async findOne(@Param("_id") _id: string) {
    const res = await this.newsListService.findOne(_id);
    return parseSuccessResponse({ data: res });
  }

  //   @ApiOperation({
  //     summary: "更新类型",
  //     description: "根据 _id 更新这个类型的其他属性",
  //   })
  /**
   * 更新产品详情
   */
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateNewsListDto: UpdateNewsListDto
  ) {
    const { typeId } = updateNewsListDto;
    const news = await this.newsListService.findOne(_id);
    if (news) {
      if (typeId) {
        const type = await this.productTypeService.findOne(typeId);
        if (type) {
          const res = await this.newsListService.update(_id, updateNewsListDto);
          return parseSuccessResponse({ data: res });
        } else {
          return new HttpException("类型不正确", HttpStatus.FORBIDDEN);
        }
      } else {
        const res = await this.newsListService.update(_id, updateNewsListDto);
        return parseSuccessResponse({ data: res });
      }
    } else {
      return new HttpException("id不正确", HttpStatus.FORBIDDEN);
    }
  }

  /**
   * 删除产品
   * @param _id
   * @returns
   */
  @Delete(":_id")
  async remove(@Param("_id") _id: string): Promise<IResponseStructure<string>> {
    await this.newsListService.remove(_id);
    return parseSuccessResponse({
      data: "删除成功！",
    });
  }
}
