import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://jrjrevuelta:7qq5Esq4Vf3nKtb0@tasks.qb3nbco.mongodb.net/?retryWrites=true&w=majority&appName=Tasks', //later with env file
      database: 'Tasks', 
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Task],
    }),
    TasksModule,
  ],
})
export class AppModule {}

