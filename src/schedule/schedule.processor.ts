import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('schedule')
export class ScheduleProcessor extends WorkerHost {
    // Método chamado quando um job é processado
    async process(job: Job<any, any, string>): Promise<void> {
        console.log(`Processando job: ${job.name}, dados:`, job.data);
        // Lógica para executar o job
    }
}
