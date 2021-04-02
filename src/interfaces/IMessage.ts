import { Document, Types } from "mongoose";
export interface IMessage extends Document {
  username: string;
  password: string;
  name: string;
}
