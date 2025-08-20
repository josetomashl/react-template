export type UserKV = {
  hash: string;
  full_name: string;
};

export type UserList = UserKV & {
  email: string;
};

export type UserItem = UserList & {
  name: string;
  surname: string;
  role: UserRoles;
  // ...
  created_at: string;
  updated_at: string;
};

export type UserRoles = 'SUPER' | 'ADMIN' | 'USER';
