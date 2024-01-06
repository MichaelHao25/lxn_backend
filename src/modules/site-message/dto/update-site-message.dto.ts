import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteMessageDto } from './create-site-message.dto';

export class UpdateSiteMessageDto extends PartialType(CreateSiteMessageDto) {}
