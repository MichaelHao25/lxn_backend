import { Module } from '@nestjs/common';
import { ProductAttachmentService } from './product-attachment.service';
import { ProductAttachmentController } from './product-attachment.controller';

@Module({
  controllers: [ProductAttachmentController],
  providers: [ProductAttachmentService]
})
export class ProductAttachmentModule {}
