import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VvtoolModule } from '../vvtool/vvtool.module';
import { List, ListSchema } from './entities/list.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    VvtoolModule,
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule { }
