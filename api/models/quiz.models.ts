import { model, Model, Schema } from "mongoose";
import { QuizType } from "../types/quiz";

type QuizModelType = Model<QuizType>;

const QuizSchema = new Schema<QuizType, QuizModelType>(
  {
    level: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    isMaxScore: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

export const QuizModel = model<QuizType, QuizModelType>("Quiz", QuizSchema);
