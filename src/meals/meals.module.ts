import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { PrismaService } from 'src/prisma.service';
import { ExtractorService } from 'src/extractor/extractor.service';
import { TranscriptsService } from 'src/transcripts/transcripts.service';

@Module({
  controllers: [MealsController],
  providers: [
    MealsService,
    PrismaService,
    ExtractorService,
    TranscriptsService,
  ],
})
export class MealsModule {}
