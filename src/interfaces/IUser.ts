import { Document, Types } from "mongoose";
export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  imageCover?:string;
  birthDay?: Date;
}
