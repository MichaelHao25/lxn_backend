import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { ProductService } from "../product/product.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { IGlobalConfig } from "./interface";
import { PageService } from "./page.service";

@Controller("page")
export class PageController {
  constructor(
    private readonly pageService: PageService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService
  ) {}

  @Post()
  @Public()
  async create(@Body() createPageDto: CreatePageDto) {
    const res = await this.pageService.create(createPageDto);
    return parseSuccessResponse({
      data: res,
    });
  }
  @Get("/index")
  @Public()
  async findAll() {
    const typeList = await this.pageService.findConfig({
      type: IGlobalConfig.indexSortConfig,
    });
    if (typeList?.indexShowType === null) {
      return parseSuccessResponse({
        data: [],
      });
    }
    const res = await Promise.all(
      typeList?.indexShowType.map(async (type) => {
        const product1 = await this.productService.findAll({
          type: type.id,
        });
        return {
          type: type,
          list: product1.list,
        };
      })
    );
    return parseSuccessResponse({
      data: res,
    });
  }
  @Get(":type")
  async findOne(@Param("type") type: IGlobalConfig) {
    const res = await this.pageService.findConfig({ type });
    return parseSuccessResponse({
      data: res,
    });
  }

  @Patch(":type")
  async update(
    @Param("type") type: IGlobalConfig,
    @Body() updatePageDto: UpdatePageDto
  ) {
    const res = await this.pageService.update(type, updatePageDto);
    return parseSuccessResponse({
      data: res,
    });
  }

  @Delete(":id")
  remove(@Param("id") _id: string) {
    return this.pageService.remove(_id);
  }
}
