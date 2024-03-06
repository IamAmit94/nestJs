import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>) {

    }

    // creating the task
  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);

    return await this.taskRepository.save(task)
  }

  // Fetching the task
 async findAll() {
    return await this.taskRepository.find()
  }

  //Fetching the task by id
  async findOne(id: number) {
    return await this.taskRepository.findOne({where: {id}})
  }

  // updating the task 
  async update(id: number, updateTaskDto: UpdateTaskDto) {
   const task = await this.findOne(id);
   if(!task) {
    throw new NotFoundException();
   }

   Object.assign(task, updateTaskDto);

   return this.taskRepository.save(task);
  }


  // Removing the task
  async remove(id: number) {
    const task = await this.findOne(id);
    if(!task) {
      throw new NotFoundException();
    }

    return await this.taskRepository.remove(task)
  }
}
