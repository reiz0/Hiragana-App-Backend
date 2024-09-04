import { Request, Response } from "express";
import { QuizModel } from "../models/quiz.models";
import { UserModel } from "../models/user.models";

export async function getMaxScore(req: Request, res: Response) {
  const { level, accountName } = req.body;
  try {
    const accountScores = await UserModel.findOne({ accountName }).populate({
      path: "hiraganaScore",
      match: { level },
      select: "score",
    });

    // const scoresArray = []
    // accountScores.forEach(element => {

    // });

    // const maxScore = accountScores.reduce()

    res.status(201).json(accountScores);
  } catch {}
}

export async function storeNewScore(req: Request, res: Response) {
  const { level, accountName, score } = req.body;
  try {
    const existUser = await UserModel.findOne({ accountName });
    if (!existUser)
      return res.status(400).send("This Account Name is not exists");

    const newScore = await QuizModel.create({
      level,
      score,
      user: existUser._id,
    });

    const updateUserScore = await UserModel.findByIdAndUpdate(existUser._id, {$push: {hiraganaScore: [newScore._id]}}, {runValidator: true, new: true})

    res.status(201).json(updateUserScore);
  } catch (error) {
    res.status(500).json({ error });
  }
}
