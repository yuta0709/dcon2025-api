import { Module } from '@nestjs/common';
import { CareReceiversService } from './care-receivers.service';
import { CareReceiversController } from './care-receivers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CareReceiversController],
  providers: [CareReceiversService, PrismaService],
})
export class CareReceiversModule {}
