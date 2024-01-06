import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import parseResponse, { IResponse } from 'src/common/parseResponse';
import { UpdateVvtoolDto } from './dto/update-vvtool.dto';
import { VvtoolService } from './vvtool.service';

@Controller('vvtool')
export class VvtoolController {
  constructor(private readonly vvtoolService: VvtoolService) { }

  async create(): Promise<IResponse> {
    const res = await this.vvtoolService.create();
    return parseResponse({ data: res });
  }

  /**
   * 获取token
   */
  @Public()
  @Get()
  async getToken(): Promise<IResponse> {
    const res = await this.vvtoolService.getToken();
    return parseResponse({ data: res });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vvtoolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVvtoolDto: UpdateVvtoolDto) {
    return this.vvtoolService.update(+id, updateVvtoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vvtoolService.remove(id);
  }
}
