import { Expose } from 'class-transformer';

export class CareReceiverResponseDto {
  @Expose()
  uuid: string;
  @Expose()
  name: string;
}
