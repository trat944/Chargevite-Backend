import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { WebsocketModule } from './websocket/websocket.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('DATABASE_URL'),
        database: 'Tasks',
        synchronize: true,
        useUnifiedTopology: true,
        entities: [Task],
      }),
      inject: [ConfigService],
    }),
    TasksModule,
    WebsocketModule,
  ],
  providers: [MailService],
})
export class AppModule {}


