import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormModule } from './form/form.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({

      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({

        type: 'postgres',

        host: config.get('DB_HOST'),

        port: config.get<number>('DB_PORT'),

        username: config.get('DB_USERNAME'),

        password: config.get('DB_PASSWORD'),

        database: config.get('DB_DATABASE'),

        autoLoadEntities: true,

        synchronize: true,

      }),

    }),

    FormModule,

  ],
})
export class AppModule {}