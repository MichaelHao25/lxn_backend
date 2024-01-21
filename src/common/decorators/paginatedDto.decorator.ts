// import { Type, applyDecorators } from "@nestjs/common";
// import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
// import { BaseResponse, PageResponse } from "src/dto/index.dto";

// export enum IResponseDataType {
//   Object,
//   Array,
// }
// /**
//  * 如果model没有的话就返回string
//  */
// export const ApiUserDefaultResponse = <TModel extends Type<any>>(
//   model?: TModel,
//   type?: IResponseDataType
// ) => {
//   if (model === undefined) {
//     return ApiOkResponse({
//       schema: {
//         allOf: [
//           { $ref: getSchemaPath(BaseResponse) },
//           {
//             properties: {
//               data: {
//                 type: "string",
//               },
//             },
//           },
//         ],
//       },
//     });
//   }
//   return applyDecorators(
//     ApiExtraModels(BaseResponse, model),
//     ApiOkResponse({
//       schema: {
//         allOf: [
//           { $ref: getSchemaPath(BaseResponse) },
//           {
//             properties: {
//               data: (() => {
//                 if (model) {
//                   return {
//                     type: "string",
//                   };
//                 }
//                 if (type === IResponseDataType.Array) {
//                   return {
//                     type: "array",
//                     items: { $ref: getSchemaPath(model) },
//                   };
//                 } else {
//                   return { $ref: getSchemaPath(model) };
//                 }
//               })(),
//             },
//           },
//         ],
//       },
//     })
//   );
// };

// export const ApiUserPaginatedDefaultResponse = <TModel extends Type<any>>(
//   model?: TModel
// ) => {
//   return applyDecorators(
//     ApiExtraModels(BaseResponse, PageResponse, model),
//     ApiOkResponse({
//       schema: {
//         allOf: [
//           { $ref: getSchemaPath(BaseResponse) },
//           {
//             properties: {
//               data: [
//                 { $ref: getSchemaPath(PageResponse) },
//                 {
//                   properties: {
//                     list: {
//                       type: "array",
//                       items: { $ref: getSchemaPath(model) },
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     })
//   );
// };
