import { Document, Types } from "mongoose";
import { Member } from "./Member";
import { QuickReplies } from "./quickReplies";
export interface Message extends Document {
  text: string;
  image: string;
  audio: string;
  system: Boolean;
  sent: Boolean;
  received: Boolean;
  quickReplies: QuickReplies[];
  member: Member;
}
