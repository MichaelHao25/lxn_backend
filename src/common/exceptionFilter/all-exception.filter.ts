import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { IErrorShowType, IResponseStructure } from "src/utils/interface";

/**
 * 全局范围内的过滤器
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const responseBody: IResponseStructure = {
      success: false,
    };
    if (exception instanceof HttpException) {
      /**
       * http 异常
       */
      responseBody.errorCode = exception.getStatus();
      responseBody.errorMessage = exception.message;
      const response = exception.getResponse();
      if (response instanceof Object) {
        const { showType = undefined, message } = response as {
          showType: IErrorShowType;
          message: any;
        };
        responseBody.showType = showType;
        responseBody.errorMessage = message;
      }
    } else {
      /**
       * 未知异常
       */
      responseBody.errorCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody.errorMessage = "未知错误";
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.errorCode);
  }
}
