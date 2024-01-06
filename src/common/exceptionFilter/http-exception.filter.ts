import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
/**
 * 异常过滤器(这个是过滤所有的 http 异常)
 * 虽然基本（内置）异常过滤器可以自动为您处理许多情况，但您可能希望完全控制异常层。例如，您可能想要添加日志记录或根据某些动态因素使用不同的 JSON 模式。异常过滤器正是为此目的而设计的。它们使您可以控制确切的控制流程以及发送回客户端的响应内容。
 *
 * 让我们创建一个异常过滤器，负责捕获作为类实例的异常HttpException，并为它们实现自定义响应逻辑。为此，我们需要访问底层平台Request和Response对象。我们将访问该Request对象，以便提取原始对象url并将其包含在日志记录信息中。我们将使用该Response对象通过该方法直接控制发送的响应response.json()。
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 1
    const response: FastifyReply = ctx.getResponse(); // 2
    const request: FastifyRequest = ctx.getRequest(); // 3
    const status = exception.getStatus(); // 4

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
