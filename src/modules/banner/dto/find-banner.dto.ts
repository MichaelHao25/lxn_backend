import { PageConfig } from "src/dto/index.dto";
import { IBannerType } from "../interface";

export class FindBannerDto extends PageConfig {
  type?: IBannerType;
}
