import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products/products.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
import { BullModule } from '@nestjs/bullmq';  // Importando o BullMQ

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'produtos',
      entities: [Products, Users],
      synchronize: true,
    }),
    // Configurando o BullModule com Redis
    BullModule.forRoot({
      connection: {
        host: 'localhost',  // Ajuste para o host do seu Redis
        port: 6379,         // Porta padrão do Redis
      },
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    ScheduleModule,  // Módulo de agendamento
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
