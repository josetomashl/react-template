import { POSTS } from '@/plugins/constants/modules/posts';

export interface PostKV {
  hash: string;
  title: string;
}
export interface PostList extends PostKV {
  author: string;
  tags: string[];
  status: keyof typeof POSTS.status;
}
export interface PostItem extends PostKV {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
