import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Type, TypeSchema } from "./entities/type.entity";
import { TypeController } from "./type.controller";
import { TypeService } from "./type.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
  ],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {}
