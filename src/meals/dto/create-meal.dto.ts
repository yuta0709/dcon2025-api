import { MealType } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CreateMealDto {
  userUuid: string;
  careReceiverUuid: string;
  mealType: MealType;
}

export class CreateMealResponseDto {
  @Expose()
  uuid: string;
}
