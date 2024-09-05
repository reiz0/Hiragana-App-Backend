import { Schema } from "mongoose";

export type UserType = {
  userName: string;
  accountName: string;
  password: string;
  hiraganaScore: Schema.Types.ObjectId[];
};

export type ScoreType = {
  level: number
  maxScore: number
}

type  HiraganaScoreType = {
  forEach(arg0: (e: any) => void): unknown;
  _id: Schema.Types.ObjectId
  level: number
  score: number

}
export type AccountScoresType = {
  _id: Schema.Types.ObjectId
  hiraganaScore: HiraganaScoreType
}