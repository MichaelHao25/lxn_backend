import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LabelModule } from "../label/label.module";
import { TypeModule } from "../type/type.module";
import { News, NewsSchema } from "./entities/news.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
    TypeModule,
    LabelModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
