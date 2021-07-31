import { Document, Types } from "mongoose";
import { Member } from "./Member";
import { Message } from "./Message";
export interface Room extends Document {
  name: string;
  avatar?: string;
  messages?: Message[];
  author: Member;
  members: Member[];
}
