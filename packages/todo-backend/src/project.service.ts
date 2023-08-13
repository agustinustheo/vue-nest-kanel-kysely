import { Injectable } from '@nestjs/common';
import { db } from './database';
import { UsersId } from 'todo-shared/dist/public/Users';
import { ProjectsId } from 'todo-shared/dist/public/Projects';

@Injectable()
export class ProjectService {
  async getAll() {
    return await db.selectFrom('projects').selectAll().execute();
  }

  async get(id: ProjectsId) {
    return await db
      .selectFrom('projects')
      .selectAll()
      .where('id', '=', id)
      .execute();
  }

  async getByUserId(id: UsersId) {
    return await db
      .selectFrom('projects')
      .selectAll()
      .where('projects.userid', '=', id)
      .execute();
  }

  async create(name: string, userid: UsersId) {
    return await db
      .insertInto('projects')
      .values({ name, userid })
      .returning(['id', 'name', 'userid'])
      .executeTakeFirst();
  }

  async update(id: ProjectsId, name: string) {
    return await db
      .updateTable('projects')
      .set({ name })
      .where('id', '=', id)
      .returning(['id', 'name', 'userid'])
      .executeTakeFirst();
  }

  async delete(id: ProjectsId) {
    return await db
      .deleteFrom('projects')
      .where('id', '=', id)
      .returning(['id', 'name', 'userid'])
      .executeTakeFirst();
  }
}
