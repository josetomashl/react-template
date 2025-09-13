import { USERS } from '@/plugins/constants/modules/users';

export type UserRole = keyof typeof USERS.roles;
export type UserStatus = keyof typeof USERS.status;

export interface UserKV {
  hash: string;
  full_name: string;
}

export interface UserList extends UserKV {
  email: string;
  createdAt: Date;
}

export interface UserItem extends UserList {
  name: string;
  surname: string;
  role: UserRole;
  status: UserStatus;
  updatedAt: Date;
}
