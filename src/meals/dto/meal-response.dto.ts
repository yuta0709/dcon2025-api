import { Expose } from 'class-transformer';

export class MealResponseDto {
  @Expose()
  mainDish: number;
  @Expose()
  sideDish: number;
  @Expose()
  soup: number;
  @Expose()
  note: string;
}
