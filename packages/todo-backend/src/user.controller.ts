// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UsersId } from 'todo-shared/dist/public/Users';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: UsersId) {
    return await this.userService.get(id);
  }

  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
  ) {
    return await this.userService.create(name, email);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: UsersId,
    @Body('name') name: string,
    @Body('email') email: string,
  ) {
    return await this.userService.update(id, name, email);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: UsersId) {
    return await this.userService.delete(id);
  }
}
