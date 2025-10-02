import { USERS } from '@/plugins/constants/modules/users';
import type { PostList } from './Post';

export type UserRole = keyof typeof USERS.roles;
export type UserStatus = keyof typeof USERS.status;

export interface UserKV {
  id: string;
  full_name: string;
}

export interface UserList extends UserKV {
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string | null;
  removedAt: string | null;
}

export interface UserItem extends UserList {
  name: string;
  surname: string;
  posts: PostList[];
}
