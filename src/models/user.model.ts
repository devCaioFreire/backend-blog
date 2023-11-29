import { IPost } from "./post.model";

export interface IUser {
  email: string;
  password: string;
  name: string;
  posts?: {
    create?: IPost[]; 
  };
}