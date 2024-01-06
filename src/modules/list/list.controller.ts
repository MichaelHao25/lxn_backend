import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { IsEnum } from "class-validator";
import { Public } from "src/common/decorators/public.decorator";
import parseResponse, { IResponse } from "src/common/parseResponse";
import { ParamsIdValidator } from "src/utils/interface";
import { IShopType } from "../order/entities/order.entity";
import { VvtoolService } from "../vvtool/vvtool.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { ListDocument } from "./entities/list.entity";
import { ListService } from "./list.service";
export class QueryValidator {
  @IsEnum(IShopType)
  type: IShopType;
}
@Controller("list")
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly vvtoolService: VvtoolService
  ) {}

  @Post()
  async create(
    @Body() createListDto: CreateListDto
  ): Promise<IResponse<ListDocument>> {
    this.listService.create(createListDto);
    return parseResponse({
      statusCode: 200,
      message: "保存成功！",
    });
  }

  @Public()
  @Get()
  async findAll(): Promise<IResponse<Record<string, any>[]>> {
    const res = await this.listService.findAll();
    return parseResponse<Record<string, any>[]>({
      data: res.map((item) => item.details),
    });
  }

  @Public()
  @Get(":id")
  async findOne(
    @Param() params: ParamsIdValidator,
    @Query() query: QueryValidator
  ): Promise<IResponse<Record<string, any>>> {
    const { type } = query;
    const { id } = params;

    // const details = await new Promise((resolve, reject) => {
    //   const url = path.resolve(__dirname, `../../../data/${params.id}.json`);
    //   const stream = createReadStream(url);
    //   let json = '';
    //   stream.on('data', (data) => (json += data));
    //   stream.on('end', () => {
    //     try {
    //       const { data = {} } = JSON.parse(json);
    //       if (Object.keys(data).length !== 0) {
    //         resolve(data);
    //       }
    //     } catch (error) {
    //       reject(true);
    //     }
    //   });
    //   stream.on('error', () => {
    //     reject(true);
    //   });
    // });
    /**
     * 如果这条数据已经存在的话就直接返回，不存在的话就创建后在返回。
     */

    const res = await this.listService.findOne(params.id);
    if (res) {
      return parseResponse({ data: res.details });
    } else {
      const token = await this.vvtoolService.getToken();
      if (token) {
        const details = await this.listService.getDetails({ ...token, id });
        await this.listService.create({
          type,
          id,
          details,
        });
        return parseResponse({
          data: details,
        });
      } else {
        throw new HttpException(
          "Token 获取失败",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Patch(":id")
  async update(
    @Param() params: ParamsIdValidator,
    @Body() updateListDto: UpdateListDto
  ): Promise<IResponse> {
    await this.listService.update(params.id, updateListDto);
    return parseResponse({
      message: "更新成功！",
    });
  }

  @Delete(":id")
  async remove(@Param() params: ParamsIdValidator): Promise<IResponse> {
    this.listService.remove(params.id);
    return parseResponse({
      message: "更新成功！",
    });
  }
}
