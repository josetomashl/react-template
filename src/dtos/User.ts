import { USERS } from '@/plugins/constants/modules/users';

export type UserRole = keyof typeof USERS.roles;
export type UserStatus = keyof typeof USERS.status;

export interface UserKV {
  id: string;
  full_name: string;
}

export interface UserList extends UserKV {
  email: string;
  is_removed: boolean;
  created_at: Date;
}

export interface UserItem extends UserList {
  name: string;
  surname: string;
  role: UserRole;
  updated_at: Date;
}
