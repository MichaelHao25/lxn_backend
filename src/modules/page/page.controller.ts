import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import parseSuccessResponse from "src/common/parseSuccessResponse";
import { AdService } from "../ad/ad.service";
import { BannerService } from "../banner/banner.service";
import { LabelService } from "../label/label.service";
import { NewsService } from "../news/news.service";
import { ProductService } from "../product/product.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { PageService } from "./page.service";

@Controller("page")
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly bannerService: BannerService,
    private readonly adService: AdService,
    private readonly productService: ProductService,
    private readonly newsService: NewsService,
    private readonly labelService: LabelService
  ) {}

  @Post()
  @Public()
  async create(@Body() createPageDto: CreatePageDto) {
    const res = await this.pageService.create(createPageDto);
    return parseSuccessResponse({
      data: res,
    });
  }
  @Get()
  async findConfig() {
    const res = await this.pageService.findOne();
    return parseSuccessResponse({
      data: res,
    });
  }

  @Get("/index")
  @Public()
  async findAll() {
    const labelList = await this.findConfig();
    const { data } = labelList;
    if (data?.indexShowLabel === null) {
      return parseSuccessResponse({
        data: [],
      });
    }
    const res = await Promise.all(
      data?.indexShowLabel.map(async (label) => {
        const product1 = await this.productService.findAll({
          label: label.id,
        });
        return {
          label: label,
          list: product1.list,
        };
      })
    );
    return parseSuccessResponse({
      data: res,
    });
  }

  @Get(":id")
  findOne(@Param("id") _id: string) {
    return this.pageService.findOne();
  }

  @Patch(":id")
  async update(@Param("id") _id: string, @Body() updatePageDto: UpdatePageDto) {
    const res = await this.pageService.update(_id, updatePageDto);
    return parseSuccessResponse({
      data: res,
    });
  }

  @Delete(":id")
  remove(@Param("id") _id: string) {
    return this.pageService.remove(_id);
  }
}
