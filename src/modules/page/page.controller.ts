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
import { AdService } from "../ad/ad.service";
import { IAdType } from "../ad/interface";
import { BannerService } from "../banner/banner.service";
import { IBannerType } from "../banner/interface";
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
    private readonly newsService: NewsService
  ) {}

  @Post()
  @Public()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pageService.create(createPageDto);
  }

  @Get("/index")
  @Public()
  async findAll() {
    const defaultList: unknown[] = [];
    const banner1 = await this.bannerService.findAll({
      type: IBannerType.Home_Banner_1,
    });
    const product1 = await this.productService.findAll({
      label: "669203c5eb48cd88650e1556",
    });
    const banner2 = await this.bannerService.findAll({
      type: IBannerType.Home_Banner_2,
    });
    const news1 = await this.newsService.findAll({
      label: "669203cceb48cd88650e1558",
    });

    const ad1 = await this.adService.findAll({
      type: IAdType.Home_Ad_1,
    });
    const ad2 = await this.adService.findAll({
      type: IAdType.Home_Ad_2,
    });
    const product2 = await this.productService.findAll({
      label: "669203ddeb48cd88650e155a",
    });
    const product3 = await this.productService.findAll({
      label: "669203e5eb48cd88650e155c",
    });
    const product4 = await this.productService.findAll({
      label: "669203feeb48cd88650e155f",
    });
    const product5 = await this.productService.findAll({
      label: "66920405eb48cd88650e1561",
    });
    const product6 = await this.productService.findAll({
      label: "6692040eeb48cd88650e1563",
    });

    defaultList.push(banner1);
    defaultList.push(product1);
    defaultList.push(news1);
    defaultList.push(ad1);
    defaultList.push(ad2);
    defaultList.push(product2);
    defaultList.push(product3);
    defaultList.push(banner2);
    defaultList.push(product4);
    defaultList.push(product5);
    defaultList.push(product6);

    return defaultList;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pageService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(+id, updatePageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pageService.remove(+id);
  }
}
