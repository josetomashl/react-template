import { POSTS } from '@/plugins/constants/modules/posts';
import type { TagKV } from './Tag';

export interface PostKV {
  id: string;
  title: string;
}

export interface PostList extends PostKV {
  tags: TagKV[];
  status: keyof typeof POSTS.status;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface PostItem extends PostList {
  content: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    posts: PostKV[];
  };
}

export interface UpdatePostBody {
  title: string;
  content: string;
  tags: string[];
  status: keyof typeof POSTS.status;
}

export interface CreatePostBody {
  title: string;
  content: string;
  tags: string[];
  status: keyof typeof POSTS.status;
}
