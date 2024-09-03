import { Schema } from "mongoose";

export type UserType = {
  userName: string;
  accountName: string;
  password: string;
  hiraganaScore: Schema.Types.ObjectId[];
};
