import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { ObjectId } from 'mongodb';
import { WebsocketGateway } from 'src/websocket/websocket/websocket.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    try {
      const objectId = new ObjectId(id);
      const task = await this.taskRepository.findOne({ where: { _id: objectId } });
      return task;
    } catch (error) {
      console.error('Error finding task:', error);
      throw error;
    }
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    const savedTask = await this.taskRepository.save(task);
    this.websocketGateway.emitTaskCreated(savedTask);
    return savedTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const objectId = new ObjectId(id);
      await this.taskRepository.update({ _id: objectId }, updateTaskDto);
      const updatedTask = await this.taskRepository.findOne({ where: { _id: objectId } });
      this.websocketGateway.emitTaskUpdated(updatedTask);
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<Task> {
    try {
      const objectId = new ObjectId(id);
      const task = await this.taskRepository.findOne({ where: { _id: objectId } });
      if (task) {
        await this.taskRepository.delete({ _id: objectId });
        this.websocketGateway.emitTaskDeleted(id);
        return task;
      }
    } catch (error) {
      console.error('Error removing task:', error);
      throw error;
    }
  }
}



