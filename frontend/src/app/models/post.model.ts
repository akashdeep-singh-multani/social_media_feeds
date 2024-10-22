import { PosterInfo } from "./poster-info.model";

export interface Post{
    _id:number;
    text:string;
    image:File | null;
    // date:string;
    user_id: PosterInfo;
    createdAt:any;
}