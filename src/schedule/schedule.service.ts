import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectQueue('schedule') private readonly scheduleQueue: Queue,
    ) { }

    // Método para adicionar um job à fila com atraso
    async scheduleJob(data: any, delay: number) {
        await this.scheduleQueue.add('job-name', data, {
            delay: delay,  // Atraso em milissegundos
        });
    }
}