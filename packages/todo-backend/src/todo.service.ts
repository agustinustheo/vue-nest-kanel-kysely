import { db } from './database';
import { Injectable } from '@nestjs/common';
import Todo, { TodosId } from 'todo-shared/dist/public/Todos';

@Injectable()
export class TodoService {
  async getAll() {
    return await db.selectFrom('todos').selectAll().execute();
  }

  async create(title: string) {
    return db
      .insertInto('todos')
      .values({ title, completed: false })
      .executeTakeFirst();
  }

  async update(id: TodosId, title: string, completed: boolean) {
    return db
      .updateTable('todos')
      .set({ title, completed })
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async delete(id: TodosId) {
    return db
      .deleteFrom('todos')
      .where("id", "=", id)
      .executeTakeFirst();
  }
}
