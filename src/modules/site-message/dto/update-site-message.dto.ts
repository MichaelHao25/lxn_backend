import { PartialType } from "@nestjs/swagger";
import { CreateSiteMessageDto } from "./create-site-message.dto";

export class UpdateSiteMessageDto extends PartialType(CreateSiteMessageDto) {}
