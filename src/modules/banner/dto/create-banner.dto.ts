import { OmitType } from "@nestjs/swagger";
import { Banner } from "../entities/banner.entity";

export class CreateBannerDto extends OmitType(Banner, ["updateAt"]) {}
