import { Request, Response } from "express";
import { QuizModel } from "../models/quiz.models";
import { UserModel } from "../models/user.models";
import { AccountScoresType, ScoreType } from "../types/user";

export async function getAllMaxScore(req: Request, res: Response) {
  const { accountName } = req.body;
  try {
    const accountScores: AccountScoresType | null = await UserModel.findOne({ accountName })
      .populate({
        path: "hiraganaScore",
        select: "level score",
      })
      .select("hiraganaScore");

    const scores: ScoreType[] = [];

    if (!accountScores) {
      res.status(400).send("there is no scores in this account");
    } else {
      accountScores.hiraganaScore.forEach((e) => {
        let isNoScoer = true;
        scores.forEach((score) => {
          score.level === e.level && (isNoScoer = false);
          !isNoScoer && score.maxScore < e.score && (score.maxScore = e.score);
        });
        isNoScoer && scores.push({ level: e.level, maxScore: e.score });
      });
    }

    // const scoresArray = []
    // accountScores.forEach(element => {

    // });

    // const maxScore = accountScores.reduce()

    res.status(201).json(scores);
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

    const updateUserScore = await UserModel.findByIdAndUpdate(
      existUser._id,
      { $push: { hiraganaScore: [newScore._id] } },
      { runValidator: true, new: true }
    );

    res.status(201).json(updateUserScore?.hiraganaScore);
  } catch (error) {
    res.status(500).json({ error });
  }
}
