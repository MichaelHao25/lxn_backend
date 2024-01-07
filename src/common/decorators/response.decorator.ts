// import { Type, applyDecorators } from "@nestjs/common";
// import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
// import { IResponseStructure } from "src/utils/interface";

// export const ApiSwaggerResponse = <TModel extends Type<any>>() =>
//   /**
//    * data 内容
//    */
//   //   model: TModel,
//   /**
//    * data是数组还是对象或者是字符串
//    */
//   //   type = {}
//   {
//     //   /**
//     //    * 获取data的数据类型
//     //    */
//     //   const getDataType = () => {
//     //     if (type instanceof Array) {
//     //       return {
//     //         type: "array",
//     //         items: { $ref: getSchemaPath(model) },
//     //       };
//     //     }
//     //     if (type instanceof Object) {
//     //       return { $ref: getSchemaPath(model) };
//     //     }
//     //     return { type: typeof type };
//     //   };
//     return applyDecorators(
//       ApiExtraModels(
//         IResponseStructure
//         //   , model
//       ),
//       ApiOkResponse({
//         schema: {
//           allOf: [
//             { $ref: getSchemaPath(IResponseStructure) },
//             // {
//             //   properties: {
//             //     data: {
//             //       type: "any",
//             //     },
//             //   },
//             // },
//           ],
//         },
//       })
//     );
//   };
