import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  uuid: string;
  @Expose()
  name: string;
}
