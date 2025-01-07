import { Expose } from 'class-transformer';

export class MealResponseDto {
  @Expose()
  uuid: string;
  @Expose()
  mainDish: number | null;
  @Expose()
  sideDish: number | null;
  @Expose()
  soup: number | null;
  @Expose()
  note: string | null;
}
