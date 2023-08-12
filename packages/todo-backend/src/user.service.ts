import { Injectable } from "@nestjs/common";
import { UsersId } from "todo-shared/dist/public/Users";
import { db } from "./database";

@Injectable()
export class UserService {
  async getAll() {
    return await db.selectFrom('users').selectAll().execute();
  }

  async create(name: string, email: string) {
    return await db
      .insertInto('users')
      .values({ name, email })
      .executeTakeFirst();
  }

  async update(id: UsersId, name: string, email: string) {
    return await db
      .updateTable('users')
      .set({ name, email })
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async delete(id: UsersId) {
    return await db
      .deleteFrom('users')
      .where("id", "=", id)
      .executeTakeFirst();
  }
}
