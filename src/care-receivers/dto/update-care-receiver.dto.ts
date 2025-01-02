import { PartialType } from '@nestjs/mapped-types';
import { CreateCareReceiverDto } from './create-care-receiver.dto';

export class UpdateCareReceiverDto extends PartialType(CreateCareReceiverDto) {
  name: string;
}
