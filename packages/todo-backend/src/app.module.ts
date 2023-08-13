import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { TodoService } from './todo.service';
import { UserService } from './user.service';
import { ProjectController } from './project.controller';
import { TodoController } from './todo.controller';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [ProjectController, TodoController, UserController],
  providers: [ProjectService, TodoService, UserService],
})
export class AppModule {}
