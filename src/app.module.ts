import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/your-database-name',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Task],
    }),
    TasksModule,
  ],
})
export class AppModule {}

