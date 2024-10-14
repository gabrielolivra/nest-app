import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';  // BullMQ ao invés de Bull
import { ScheduleService } from './schedule.service';
import { ScheduleProcessor } from './schedule.processor';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'schedule', // Nome da fila para agendamento
    }),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleProcessor],
})
export class ScheduleModule { }
