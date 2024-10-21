import {Comment} from './comment.model';

export interface CommentResponse{
    status: boolean;
    message:string;
    data: Comment[]
}