import { Document, Types } from "mongoose";
export interface IStory extends Document {
  username: string;
  password: string;
  name: string;
}
