import fastifyMultipart from "@fastify/multipart";
import { RequestMethod } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import * as path from "path";
import { AppModule } from "./app.module";
import { ApiPrefix, HttpPort, HttpsPort } from "./constants";

// const http = () => {};
async function bootstrap(https: boolean) {
  /**
   * https 证书配置
   */
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, "./secrets/private-key.pem")),
    cert: fs.readFileSync(
      path.resolve(__dirname, "./secrets/public-certificate.pem")
    ),
  };
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      ...(https
        ? {
            https: httpsOptions,
            http2: true,
          }
        : {}),
    })
  );
  /**
   * 允许跨域
   */
  app.enableCors({
    // origin: '*',
    // allowedHeaders: ['Authorization', 'content-type'],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  /**
   * 注册文件上传
   */
  app.register(fastifyMultipart, {
    limits: {
      /**
       * 最大10mb
       */
      fileSize: 1024 * 1024 * 100,
    },
  });
  /**
   * 异常过滤的几种方法，现在使用app.module.ts里面去过滤全局异常
   *
   * useGlobalFilters()方法不会为网关或混合应用程序设置过滤器。
   */
  //   app.useGlobalFilters(new HttpExceptionFilter());
  //   const { httpAdapter } = app.get(HttpAdapterHost);
  //   app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  /**
   * 设置默认前缀，排除/
   */
  app.setGlobalPrefix(ApiPrefix, {
    exclude: [
      {
        path: "/",
        method: RequestMethod.GET,
      },
    ],
  });

  /**
   * 设置全局管道，校验请求参数
   */
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      /**
       * 将对象转换为DTO类
       * @description: 自动转换类型
       */
      transform: true,
    })
  );
  /**
   * 配置api接口文档
   */
  const config = new DocumentBuilder()
    .addBasicAuth({
      type: "http",
      scheme: "bearer",
    })
    .setTitle("api接口文档")
    .setDescription("")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  if (https) {
    await app.listen(HttpsPort, "0.0.0.0");
  } else {
    await app.listen(HttpPort, "0.0.0.0");
  }
}
bootstrap(false);
