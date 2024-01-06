import { Injectable } from "@nestjs/common";
// import { InjectRepository } from '@nestjs/typeorm';
import { isNotEmpty, isString } from "class-validator";
// import { Repository } from 'typeorm';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  /**
   * 登出
   * TODO 暂时没有登出，做一个黑名单，过期的token存储进去，当进入黑名单的token就给他干掉，一天执行一次，到期就给删除掉
   */
  async logout() {}
  /**
   * 创建一个新用户
   * @param createUserDto 用户信息
   * @returns UserDocument
   */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    return newUser;
  }
  /**
   * 查找所有的用户
   */
  async findAll(): Promise<UserDocument[]> {
    const res = await this.userModel
      .find(
        {},
        {
          _id: 1,
          username: 1,
          isAdmin: 1,
          isDisable: 1,
          updateAt: 1,
        }
      )
      .exec();
    return res;
  }

  /**
   * 根据用户民查找用户
   * @param username
   * @returns
   */
  async findOneByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne(
      { username },
      {
        _id: 1,
        username: 1,
        isAdmin: 1,
        isDisable: 1,
        updateAt: 1,
      }
    );
    return user;
  }

  /**
   * 更新一个用户的信息
   * @param username
   * @param updateUserDto
   * @returns
   */
  async update(
    username: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDocument> {
    const { password, isActive } = updateUserDto;
    if (typeof isActive === "boolean") {
      const user = await this.userModel.findOneAndUpdate(
        { username },
        { isActive }
      );
      return user;
    }
    if (isNotEmpty(password) || isString(password)) {
      const user = await this.userModel.findOneAndUpdate(
        { username },
        { password }
      );
      return user;
    }
  }

  /**
   * 删除一个用户
   * @param username
   * @returns
   */
  async remove(username: string) {
    await this.userModel.deleteOne({ username });
    return true;
  }
}
