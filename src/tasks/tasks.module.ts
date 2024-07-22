import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { WebsocketModule } from 'src/websocket/websocket.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    WebsocketModule, 
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}

