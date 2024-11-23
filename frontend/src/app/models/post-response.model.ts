import { Post } from './post.model';

export interface PostResponse {
  status: boolean;
  data: Post[];
}
