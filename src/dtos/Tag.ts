export interface TagKV {
  id: string;
  name: string;
}

export interface TagList extends TagKV {
  description?: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TagItem extends TagList {
  createdAt: string;
}
