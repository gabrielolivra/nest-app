import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products/products.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'produtos',
      entities: [Products],
      synchronize: true,
    }),
    ProductsModule

  ],
  controllers: [
    AppController
  ], providers: [
    AppService
  ]
})

export class AppModule { }
