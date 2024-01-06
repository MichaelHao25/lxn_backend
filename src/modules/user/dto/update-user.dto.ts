import { Allow } from 'class-validator';

export class UpdateUserDto {
  @Allow()
  password?: string;
  @Allow()
  isActive?: boolean;
}
