import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export const defaultCurrent = 1;
export const defaultPageSize = 10;
/**
 * 分页控制
 */
export class PageConfig {
  /**
   * 当前页
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  /**
   * 将原始类型转换为 number
   */
  @Type(() => Number)
  current: number = defaultCurrent;
  /**
   * 每一页的数量
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  /**
   * 将原始类型转换为 number
   */
  @Type(() => Number)
  pageSize: number = defaultPageSize;
}
