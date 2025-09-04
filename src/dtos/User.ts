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
  createdAt: Date;
  updatedAt: Date;
};

export type UserRoles = 'SUPER' | 'ADMIN' | 'USER';
