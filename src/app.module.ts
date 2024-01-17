import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AllExceptionsFilter } from "./common/exceptionFilter/all-exception.filter";
import { AuthGuard } from "./common/guard/auth.guard";
import database from "./config/database";
import { NewsListModule } from "./modules/news-list/news-list.module";
import { ProductAttachmentModule } from "./modules/product-attachment/product-attachment.module";
import { ProductListModule } from "./modules/product-list/product-list.module";
import { ProductTypeModule } from "./modules/product-type/product-type.module";
import { SiteMessageModule } from "./modules/site-message/site-message.module";
import { UploadModule } from "./modules/upload/upload.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
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
    SiteMessageModule,
    UserModule,
    UploadModule,
    ProductTypeModule,
    ProductListModule,
    ProductAttachmentModule,
    NewsListModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
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
