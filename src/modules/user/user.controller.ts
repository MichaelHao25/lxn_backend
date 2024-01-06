import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { Put } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { JwtService } from "@nestjs/jwt";
import { IsNotEmpty, IsString } from "class-validator";
import { Public } from "src/common/decorators/public.decorator";
import parseResponse from "src/common/parseResponse";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
export class ParamsUsernameValidator {
  @IsString()
  @IsNotEmpty()
  username: string;
}

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * 用户注册
   */
  @Public()
  @Put("/register")
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByUsername(
      createUserDto.username
    );
    if (user) {
      return new HttpException("用户已存在", HttpStatus.FORBIDDEN);
    }
    await this.userService.create(createUserDto);
    return parseResponse({
      statusCode: 200,
      message: "注册成功！",
    });
  }

  /**
   * 用户登陆
   */
  @Public()
  @Post("/login")
  async login(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const res = await this.userService.findOneByUsername(username);
    if (res) {
      if (res.password === password) {
        if (res.isDisable === false) {
          const payload = { sub: res._id, username: res.username };
          const access_token = await this.jwtService.signAsync(payload);
          return parseResponse({
            statusCode: 200,
            data: { access_token },
            message: "登陆成功！",
          });
        }
      }
    }
    // jwtService
    throw new UnauthorizedException();
  }

  /**
   * 只显示用户名和账户是否被激活的状态
   */
  @Get()
  async findAll() {
    const res = await this.userService.findAll();
    return parseResponse({
      data: res,
    });
  }

  /**
   *
   * 根据用户名查找这个用户的完整信息
   */
  @Get(":username")
  async findOne(@Param() params: ParamsUsernameValidator) {
    const { username } = params;
    const res = await this.userService.findOneByUsername(username);
    if (res) {
      return parseResponse({ data: res });
    }
    throw new HttpException("用户信息不存在", HttpStatus.FORBIDDEN);
  }

  /**
   * 更新用户的状态信息
   * @param params 用户名
   * @param updateUserDto 需要更新的字段
   * @returns
   */
  @Patch(":username")
  async update(
    @Param() params: ParamsUsernameValidator,
    @Body() updateUserDto: UpdateUserDto
  ) {
    this.userService.update(params.username, updateUserDto);
    return parseResponse({
      statusCode: 200,
      message: "密码更改成功！",
    });
  }

  /**
   * 删除一个用户
   * @param params 用户名称
   * @returns
   */
  @Delete(":username")
  async remove(@Param() params: ParamsUsernameValidator) {
    const { username } = params;
    this.userService.remove(username);
    return parseResponse({
      statusCode: 200,
      message: "用户被删除",
    });
  }
}
