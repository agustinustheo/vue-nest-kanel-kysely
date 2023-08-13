// todo.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ProjectsId } from 'todo-shared/dist/public/Projects';
import { TodosId } from 'todo-shared/dist/public/Todos'; // Assuming you have this

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(@Query('projectId') projectId: ProjectsId) {
    if (projectId !== null) {
      return await this.todoService.getByProjectId(projectId);
    }
    return await this.todoService.getAll();
  }

  @Get(':id')
  async getTodo(@Param('id') id: TodosId) {
    return await this.todoService.get(id);
  }

  @Post()
  async createTodo(
    @Body('title') title: string,
    @Body('projectId') projectId: ProjectsId,
  ) {
    return await this.todoService.create(title, projectId);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: TodosId,
    @Body('title') title: string,
    @Body('completed') completed: boolean,
  ) {
    return await this.todoService.update(id, title, completed);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: TodosId) {
    return await this.todoService.delete(id);
  }
}