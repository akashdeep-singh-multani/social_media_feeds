import { Post } from "./post.model";

export interface PostResponse{
    success:boolean;
    data:Post[]
}