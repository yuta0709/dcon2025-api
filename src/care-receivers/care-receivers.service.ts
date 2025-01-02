import { Injectable } from '@nestjs/common';
import { CreateCareReceiverDto } from './dto/create-care-receiver.dto';
import { UpdateCareReceiverDto } from './dto/update-care-receiver.dto';
import { CareReceiverResponseDto } from './dto/care-receiver-response.dto';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CareReceiversService {
  constructor(private prismaService: PrismaService) {}

  async create(createCareReceiverDto: CreateCareReceiverDto) {
    const careReceiver = await this.prismaService.careReceiver.create({
      data: createCareReceiverDto,
    });
    return plainToClass(CareReceiverResponseDto, careReceiver);
  }

  async findAll() {
    const careReceivers = await this.prismaService.careReceiver.findMany();
    return careReceivers.map((careReceiver) =>
      plainToClass(CareReceiverResponseDto, careReceiver),
    );
  }

  async findOne(uuid: string) {
    const careReceiver = await this.prismaService.careReceiver.findUnique({
      where: { uuid },
    });
    return plainToClass(CareReceiverResponseDto, careReceiver);
  }

  async update(uuid: string, updateCareReceiverDto: UpdateCareReceiverDto) {
    const careReceiver = await this.prismaService.careReceiver.update({
      data: updateCareReceiverDto,
      where: { uuid },
    });
    return plainToClass(CareReceiverResponseDto, careReceiver);
  }

  async remove(uuid: string) {
    return this.prismaService.careReceiver.delete({ where: { uuid } });
  }
}
