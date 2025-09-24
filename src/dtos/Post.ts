import { POSTS } from '@/plugins/constants/modules/posts';

export interface PostKV {
  hash: string;
  title: string;
}
export interface PostList extends PostKV {
  author: string;
  tags: string[];
  status: keyof typeof POSTS.status;
  created_at: Date;
}
export interface PostItem extends PostList {
  content: string;
  updated_at: Date | null;
  is_removed: boolean;
}

export interface UpdatePostBody {
  title: string;
  content: string;
  author: string;
  tags: string[];
  status: keyof typeof POSTS.status;
}

export interface CreatePostBody {
  title: string;
  content: string;
  author: string;
  tags: string[];
}
