import { PartialType } from '@nestjs/mapped-types';
import { CreateVvtoolDto } from './create-vvtool.dto';

export class UpdateVvtoolDto extends PartialType(CreateVvtoolDto) {}
