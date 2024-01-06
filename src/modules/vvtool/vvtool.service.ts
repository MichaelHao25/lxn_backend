import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccessKey, Account } from 'src/constants';
import { IVvtoolAccessToken, IVvtoolResponse } from 'src/utils/interface';
import { UpdateVvtoolDto } from './dto/update-vvtool.dto';
import { Vvtool, VvtoolDocument } from './entities/vvtool.entity';

export interface ICreateReturn {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
}
@Injectable()
export class VvtoolService {
  constructor(@InjectModel(Vvtool.name) private vvtoolModel: Model<Vvtool>) { }

  async create(): Promise<ICreateReturn> {
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', Account);
    formData.append('client_secret', AccessKey);
    const response = await fetch(
      `http://api.vv-tool.com/api/proxy/oauth/token`,
      {
        body: formData,
        method: 'POST',
      },
    ).then<IVvtoolResponse<IVvtoolAccessToken>>((res) => res.json());
    if (response.code === 0 && response.data) {
      const {
        data: { access_token, token_type, expires_in, scope },
      } = response;
      const vvtool = await new this.vvtoolModel({
        accessToken: access_token,
        tokenType: token_type,
        expiresIn: expires_in,
        scope,
      });
      vvtool.save();
      return {
        accessToken: access_token,
        tokenType: token_type,
        expiresIn: expires_in,
        scope,
      };
    }
    throw new HttpException('服务器内部错误', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  async getToken(): Promise<ICreateReturn> {
    const list = await this.findAll();
    if (list.length === 0) {
      return await this.create();
    } else if (list.length !== 1) {
      console.log('token 未知的异常 token 发现了多个');
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const [{ _id, expiresIn, accessToken, scope, tokenType }] = list;
    const currentTime = ~~(Date.now() / 1000);
    const tokenCreateTime = ~~(_id.getTimestamp().getTime() / 10000);
    /**
     * 判断 token 的有效期是否小于10s
     */
    if (tokenCreateTime + expiresIn - currentTime < 10) {
      return {
        accessToken,
        tokenType,
        expiresIn,
        scope,
      };
    } else {
      this.removeById(_id);
      return await this.create();
    }
  }
  async findAll(): Promise<VvtoolDocument[]> {
    const res = await this.vvtoolModel.find().exec();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} vvtool`;
  }

  update(id: number, updateVvtoolDto: UpdateVvtoolDto) {
    return `This action updates a #${id} vvtool`;
  }

  async removeById(_id: Types.ObjectId) {
    await this.vvtoolModel.deleteOne({ _id });
    // const res = await this.vvtoolModel.findById(_id);
    // res.deleteOne();
  }
  async remove(_id: string) {
    await this.vvtoolModel.deleteOne({ _id });
    // const res = await this.vvtoolModel.findById(_id);
    // res.deleteOne();
  }
}
