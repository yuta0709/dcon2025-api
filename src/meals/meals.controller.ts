import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { plainToInstance } from 'class-transformer';
import { ExtractorService } from 'src/extractor/extractor.service';
import { MealResponseDto } from './dto/meal-response.dto';
import { TranscriptsService } from 'src/transcripts/transcripts.service';
import { CreateTranscriptDto } from '../transcripts/dto/create-transcript.dto';

@Controller('meals')
export class MealsController {
  constructor(
    private readonly mealsService: MealsService,
    private extractorService: ExtractorService,
    private transcriptsService: TranscriptsService,
  ) {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto) {
    const meal = await this.mealsService.createOrFindMeal(createMealDto);
    return plainToInstance(MealResponseDto, meal, {
      excludeExtraneousValues: true,
    });
  }

  @Post(':uuid/transcripts')
  async transcript(
    @Param('uuid') uuid: string,
    @Body() createTranscriptDto: CreateTranscriptDto,
  ) {
    const currentMeal = await this.mealsService.findOne(uuid);
    const response = await this.extractorService.extractData(
      createTranscriptDto.transcript,
      currentMeal,
    );

    const meal = await this.mealsService.update(uuid, response);
    return plainToInstance(MealResponseDto, meal, {
      excludeExtraneousValues: true,
    });
  }
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.mealsService.findOne(uuid);
  }
}
