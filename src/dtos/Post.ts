export interface PostKV {
  hash: string;
  title: string;
}
export interface PostList extends PostKV {
  author: string;
  createdAt: Date;
}
export interface PostItem extends PostKV {
  content: string;
  updatedAt: Date;
}
