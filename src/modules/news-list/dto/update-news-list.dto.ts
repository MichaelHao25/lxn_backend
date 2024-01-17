import { PartialType } from "@nestjs/swagger";
import { CreateNewsListDto } from "./create-news-list.dto";

export class UpdateNewsListDto extends PartialType(CreateNewsListDto) {}
