import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Label, LabelSchema } from "./entities/label.entity";
import { LabelController } from "./label.controller";
import { LabelService } from "./label.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }]),
  ],
  controllers: [LabelController],
  providers: [LabelService],
  exports: [LabelService],
})
export class LabelModule {}
