import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeModule } from "../type/type.module";
import { News, NewsSchema } from "./entities/news.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
    TypeModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [],
})
export class NewsModule {}
