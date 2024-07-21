import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const objectId = new ObjectId(id);
    return this.taskRepository.findOne({ where: { id: objectId } });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const objectId = new ObjectId(id);
    await this.taskRepository.update(objectId, updateTaskDto);
    return this.taskRepository.findOne({ where: { id: objectId } });
  }

  async remove(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await this.taskRepository.delete(objectId);
  }
}

