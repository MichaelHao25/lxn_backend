import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductTypeModule } from "../product-type/product-type.module";
import { NewsList, NewsListSchema } from "./entities/news-list.entity";
import { NewsListController } from "./news-list.controller";
import { NewsListService } from "./news-list.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewsList.name, schema: NewsListSchema },
    ]),
    ProductTypeModule,
  ],
  controllers: [NewsListController],
  providers: [NewsListService],
  exports: [],
})
export class NewsListModule {}
