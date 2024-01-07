import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              results: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
  );
};

export class PaginatedDto<TData> {
  /**
   * 共有多少条数据
   */
  total: number;

  /**
   * 每页多少条
   */
  limit: number;

  /**
   * 当前第几页
   */
  offset: number;
  /**
   * 列表
   */
  results: TData[];
}
