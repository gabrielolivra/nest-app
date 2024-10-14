import { Controller, Post, Body } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) { }

    @Post('job')
    async scheduleJob(@Body() body: { data: any, delay: number }) {
        await this.scheduleService.scheduleJob(body.data, body.delay);
        return { message: 'Job agendado com sucesso!' };
    }
}
