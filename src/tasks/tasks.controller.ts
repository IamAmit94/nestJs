import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // Fetch all the task
//   @Get()
//   getAllTasks(): Task[] {
//     console.log(`----------------`)
//     return this.tasksService.getAllTasks();
//   }
  // Fetch the task by Id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  // Create the task
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  // Delete the task
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  // Update the task status
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  //Fetch the task by applying the filter to it
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {

    if(Object.keys(filterDto).length) {
        return this.tasksService.getTasksWithFilters(filterDto)
    } else {
        return this.tasksService.getAllTasks()
    }
  }
}
