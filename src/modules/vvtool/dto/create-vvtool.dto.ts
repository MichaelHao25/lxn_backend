import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVvtoolDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsNumber()
  expiresIn: number;

  @IsNotEmpty()
  @IsString()
  tokenType: string;

  @IsNotEmpty()
  @IsString()
  scope: string;
}
