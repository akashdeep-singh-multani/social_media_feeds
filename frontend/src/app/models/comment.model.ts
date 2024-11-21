import { CommenterInfo } from './commenter-info.model';

export interface Comment {
  _id: number;
  text: string;
  commenterId: number;
  commenterInfo: CommenterInfo;
  postId: number;
  createdAt: any;
}
