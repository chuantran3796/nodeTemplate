import { Document, Types } from "mongoose";
export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  publicToken: string;
  privateToken: string;
  user: Types.ObjectId;
  expiredIn: number;
  tokenType: string;
  expiredAt: string;
}
