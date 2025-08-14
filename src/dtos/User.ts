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
  // ...
  created_at: string;
  updated_at: string;
};
