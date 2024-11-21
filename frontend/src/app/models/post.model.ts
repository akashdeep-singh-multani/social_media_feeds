import { PosterInfo } from './poster-info.model';

export interface Post {
  _id: number;
  text: string;
  image: File | null;
  // date:string;
  userId: PosterInfo;
  createdAt: any;
  isLiked?: boolean;
}
