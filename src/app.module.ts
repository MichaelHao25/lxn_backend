import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthGuard } from "./common/guard/auth.guard";
import database from "./config/database";
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
    /**
     * 下面的模块都不是本项目内的
     */
    // ListModule,
    // VvtoolModule,
    // OrderModule,
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
  ],
})
export class AppModule {}
