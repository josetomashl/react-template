import { USERS } from '@/plugins/constants/modules/users';

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
  role: keyof typeof USERS.roles;
  status: keyof typeof USERS.status;
  updatedAt: Date;
}
