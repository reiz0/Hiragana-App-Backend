import { Schema } from "mongoose";

export type QuizType = {
  level: number;
  score: number;
  user: Schema.Types.ObjectId;
  isMaxScore: boolean;
  quiz: string;
};
