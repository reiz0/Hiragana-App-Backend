import { QuizModel } from "../models/quiz.models";

export const getMaxScoreByUser = async (req: Request, res: Response) => {
  const { levels, user } = req.params;

  const maxScore = await QuizModel.find({ levels, user });

  res.json(maxScore);
};
