import { Schema } from "mongoose";

export type QuizType = {
  levels: number;
  maxScore: number;
  user: Schema.Types.ObjectId
}