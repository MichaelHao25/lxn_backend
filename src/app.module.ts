import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AllExceptionsFilter } from "./common/exceptionFilter/all-exception.filter";
import database from "./config/database";
import { ContactUsModule } from "./modules/contact-us/contact-us.module";
import { NewsModule } from "./modules/news/news.module";
import { ProductAttachmentModule } from "./modules/product-attachment/product-attachment.module";
import { ProductModule } from "./modules/product/product.module";
import { TypeModule } from "./modules/type/type.module";
import { UploadModule } from "./modules/upload/upload.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(database),
    ThrottlerModule.forRoot([
      {
        /**
         * 每分钟只能60个请求
         */
        ttl: 60000,
        limit: 60,
      },
    ]),
    ContactUsModule,
    UserModule,
    UploadModule,
    TypeModule,
    ProductModule,
    ProductAttachmentModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
