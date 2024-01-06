import { Allow } from 'class-validator';

export class UpdateListDto {
  @Allow()
  details: string;
}
