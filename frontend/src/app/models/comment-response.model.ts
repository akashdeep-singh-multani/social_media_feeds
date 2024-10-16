import {Comment} from './comment.model';

export interface CommentResponse{
    status: boolean;
    data: Comment[]
}