import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CareReceiversModule } from './care-receivers/care-receivers.module';
import { MealsModule } from './meals/meals.module';
import { TranscriptsModule } from './transcripts/transcripts.module';

@Module({
  imports: [UsersModule, CareReceiversModule, MealsModule, TranscriptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
