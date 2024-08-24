import { model, Model, Schema } from "mongoose";
import { QuizType } from "../types/quiz";

type QuizModelType = Model<QuizType>;

const QuizSchema = new Schema<QuizType, QuizModelType>(
  {
    levels: {
      type: Number,
      required: true,
    },
    maxScore: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const QuizModel = model<QuizType, QuizModelType>("Quiz", QuizSchema);
