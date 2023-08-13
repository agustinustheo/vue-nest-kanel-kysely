// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { UsersId } from './Users';
import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

/** Identifier type for public.projects */
export type ProjectsId = number & { __brand: 'ProjectsId' };

/** Represents the table public.projects */
export default interface ProjectsTable {
  id: ColumnType<ProjectsId, ProjectsId | null, ProjectsId | null>;

  name: ColumnType<string, string, string | null>;

  userid: ColumnType<UsersId | null, UsersId | null, UsersId | null>;
}

export type Projects = Selectable<ProjectsTable>;

export type NewProjects = Insertable<ProjectsTable>;

export type ProjectsUpdate = Updateable<ProjectsTable>;
