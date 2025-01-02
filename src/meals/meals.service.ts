import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(private prismaService: PrismaService) {}

  async createOrFindMeal(createMealDto: CreateMealDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prismaService.$transaction(async (prisma) => {
      // 今日のDailyMealを取得
      let dailyMeal = await prisma.dailyMeal.findFirst({
        where: {
          createdAt: {
            gte: today,
          },
          careReceiverUuid: createMealDto.careReceiverUuid,
        },
      });

      // 今日のDailyMealが存在しない場合は作成
      if (!dailyMeal) {
        dailyMeal = await prisma.dailyMeal.create({
          data: {
            careReceiver: {
              connect: {
                uuid: createMealDto.careReceiverUuid,
              },
            },
          },
        });
      }

      // 指定されたMealTypeのMealが存在するか確認
      let meal = await prisma.meal.findFirst({
        where: {
          dailyMealUuid: dailyMeal.uuid,
          mealType: createMealDto.mealType,
        },
      });

      // 存在しない場合は作成
      if (!meal) {
        meal = await prisma.meal.create({
          data: {
            user: {
              connect: {
                uuid: createMealDto.userUuid,
              },
            },
            dailyMeal: {
              connect: {
                uuid: dailyMeal.uuid,
              },
            },
            mealType: createMealDto.mealType,
          },
        });
      }

      return meal;
    });
  }

  async findOne(uuid: string) {
    return this.prismaService.meal.findFirst({ where: { uuid } });
  }

  async update(uuid: string, updateMealDto: UpdateMealDto) {
    return this.prismaService.meal.update({
      data: updateMealDto,
      where: { uuid },
    });
  }
}
