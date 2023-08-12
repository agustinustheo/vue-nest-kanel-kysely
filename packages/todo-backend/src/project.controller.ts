// project.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { UsersId } from 'todo-shared/dist/public/Users';
import { ProjectsId } from 'todo-shared/dist/public/Projects';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects() {
    return await this.projectService.getAll();
  }

  @Get(':id')
  async getProject(@Param('id') id: ProjectsId) {
    return await this.projectService.get(id);
  }

  @Post()
  async createProject(
    @Body('name') name: string,
    @Body('userid') userid: UsersId,
  ) {
    return await this.projectService.create(name, userid);
  }

  @Put(':id')
  async updateProject(@Param('id') id: ProjectsId, @Body('name') name: string) {
    return await this.projectService.update(id, name);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: ProjectsId) {
    return await this.projectService.delete(id);
  }
}
