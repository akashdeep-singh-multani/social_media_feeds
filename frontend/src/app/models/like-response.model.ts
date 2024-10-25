import { LikeInfo } from "./like-info.model";

export interface LikeResponse{
    status:boolean;
    message:string;
    data:LikeInfo[]
}