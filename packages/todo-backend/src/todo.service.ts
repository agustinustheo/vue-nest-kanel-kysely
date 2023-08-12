import { db } from './database';
import { Injectable } from '@nestjs/common';
import { ProjectsId } from 'todo-shared/dist/public/Projects';
import Todo, { TodosId } from 'todo-shared/dist/public/Todos';

@Injectable()
export class TodoService {
  async getAll() {
    return await db.selectFrom('todos').selectAll().execute();
  }

  async get(id: TodosId) {
    return await db
      .selectFrom('todos')
      .selectAll()
      .where('id', '=', id)
      .execute();
  }

  async getByProjectId(id: ProjectsId) {
    return await db
      .selectFrom('todos')
      .selectAll()
      .where('todos.projectid', '=', id)
      .execute();
  }

  async create(title: string, projectId: ProjectsId) {
    return await db
      .insertInto('todos')
      .values({ title, projectid: projectId, completed: false })
      .returning(['id', 'title', 'completed'])
      .executeTakeFirst();
  }

  async update(id: TodosId, title: string, completed: boolean) {
    return await db
      .updateTable('todos')
      .set({ title, completed })
      .where('id', '=', id)
      .returning(['id', 'title', 'completed'])
      .executeTakeFirst();
  }

  async delete(id: TodosId) {
    return await db
      .deleteFrom('todos')
      .where('id', '=', id)
      .returning(['id', 'title', 'completed'])
      .executeTakeFirst();
  }
}
