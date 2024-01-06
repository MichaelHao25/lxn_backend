import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vvtool, VvtoolSchema } from './entities/vvtool.entity';
import { VvtoolController } from './vvtool.controller';
import { VvtoolService } from './vvtool.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vvtool.name, schema: VvtoolSchema }]),
  ],
  controllers: [VvtoolController],
  providers: [VvtoolService],
  exports: [VvtoolService],
})
export class VvtoolModule { }
