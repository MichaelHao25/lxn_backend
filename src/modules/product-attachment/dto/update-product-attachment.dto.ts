import { PartialType } from '@nestjs/mapped-types';
import { CreateProductAttachmentDto } from './create-product-attachment.dto';

export class UpdateProductAttachmentDto extends PartialType(CreateProductAttachmentDto) {}
