import { Model, Schema, model } from "mongoose";
import { UserType } from "../types/user";

type UserModelType = Model<UserType>;

const UserSchema = new Schema<UserType, UserModelType>(
  {
    userName: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
      unique: true,
      index: true, // Ensure accountName is indexed for uniqueness
    },
    password: {
      type: String,
      required: true,
    },
    hiraganaScore: {
      type: [Schema.ObjectId],
      ref: 'Quiz',
    },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = model<UserType, UserModelType>("User", UserSchema);
