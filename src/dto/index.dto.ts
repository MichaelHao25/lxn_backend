import { Prop } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

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
  current?: number = defaultCurrent;
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
  pageSize?: number = defaultPageSize;
}

export class AttributesItem {
  /**
   * key
   */
  @IsString()
  @IsOptional()
  @Prop()
  key?: string;
  /**
   * value
   */
  @IsString()
  @IsOptional()
  @Prop()
  value?: string;
  /**
   * 描述
   */
  @IsString()
  @IsOptional()
  @Prop()
  description?: string;
}
