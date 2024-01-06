import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Public } from 'src/common/decorators/public.decorator';
import { ParamsIdValidator } from 'src/utils/interface';
import { ListService } from '../list/list.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly listService: ListService,
  ) { }

  @Post()
  @Public()
  async create(
    // @Body() createOrderDto: CreateOrderDto[]
    @Body(new ParseArrayPipe({ items: CreateOrderDto }))
    createOrderDto: CreateOrderDto[],
  ) {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  /**
   * 下载html文件
   * @param params
   * @returns
   */
  @Get(':id')
  @Public()
  @Header('Content-Type', 'text/html; charset=utf-8')
  async getFile(@Param() params: ParamsIdValidator, @Res() res: FastifyReply) {
    const { id } = params;
    res.header(
      'Content-Disposition',
      `attachment;filename=${id}_${id}_cart.html`,
    );
    const html = await this.orderService.getFile(params);
    return res.send(html);
  }
  /**
   * 下载excel文件
   * @param params
   * @returns
   */
  @Get('/excel/:id')
  @Public()
  @Header('Content-Type', 'application/octet-stream;charset=utf-8;')
  async getExcel(@Param() params: ParamsIdValidator, @Res() res: FastifyReply) {
    const { id } = params;
    res.header('Content-Disposition', `attachment;filename=${id}.xlsx`);
    const excel = await this.orderService.getExcel(params);
    return res.send(excel);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
