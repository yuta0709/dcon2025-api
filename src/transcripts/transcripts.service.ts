import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTranscriptDto } from './dto/create-transcript.dto';

@Injectable()
export class TranscriptsService {
  constructor(private prismaService: PrismaService) {}

  async createTranscript(
    mealUuid: string,
    createTranscriptDto: CreateTranscriptDto,
  ) {
    const transcript = await this.prismaService.transcript.create({
      data: {
        transcript: createTranscriptDto.transcript,
        meal: {
          connect: {
            uuid: mealUuid,
          },
        },
      },
    });
    return transcript;
  }

  async findAllByMealUuid(mealUuid: string) {
    return await this.prismaService.transcript.findMany({
      where: {
        mealUuid,
      },
    });
  }
}
