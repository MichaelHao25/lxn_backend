import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

/**
 * 分页控制
 */
export class PageConfig {
  /**
   * 当前页
   */
  @IsInt()
  @Min(1)
  /**
   * 将原始类型转换为 number
   */
  @Type(() => Number)
  current: number;
  /**
   * 每一页的数量
   */
  @IsInt()
  @Min(1)
  /**
   * 将原始类型转换为 number
   */
  @Type(() => Number)
  pageSize: number;
}
