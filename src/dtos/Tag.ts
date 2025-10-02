export interface TagKV {
  id: string;
  name: string;
}

export interface TagList extends TagKV {
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
