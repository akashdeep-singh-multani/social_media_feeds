import { CommenterInfo } from "./commenter-info.model";

export interface Comment{
    _id:number;
    text:string;
    commenter_id:number;
    commenterInfo:CommenterInfo
    post_id:number;
    createdAt:any;
}