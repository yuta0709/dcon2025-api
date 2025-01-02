import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CareReceiversService } from './care-receivers.service';
import { CreateCareReceiverDto } from './dto/create-care-receiver.dto';
import { UpdateCareReceiverDto } from './dto/update-care-receiver.dto';
import { CareReceiverResponseDto } from './dto/care-receiver-response.dto';
import { plainToClass } from 'class-transformer';

@Controller('care-receivers')
export class CareReceiversController {
  constructor(private readonly careReceiversService: CareReceiversService) {}

  @Post()
  async create(@Body() createCareReceiverDto: CreateCareReceiverDto) {
    const careReceiver = await this.careReceiversService.create(
      createCareReceiverDto,
    );
    return plainToClass(CareReceiverResponseDto, careReceiver);
  }

  @Get()
  async findAll() {
    const careReceivers = await this.careReceiversService.findAll();
    return careReceivers.map((careReceiver) =>
      plainToClass(CareReceiverResponseDto, careReceiver),
    );
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const careReceiver = await this.careReceiversService.findOne(uuid);
    return plainToClass(CareReceiverResponseDto, careReceiver);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateCareReceiverDto: UpdateCareReceiverDto,
  ) {
    const careReceiver = await this.careReceiversService.update(
      uuid,
      updateCareReceiverDto,
    );
    return plainToClass(CareReceiverResponseDto, careReceiver);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.careReceiversService.remove(uuid);
  }
}
