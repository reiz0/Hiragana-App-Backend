import { Request, Response } from "express";
import { QuizModel } from "../models/quiz.models";
import { UserModel } from "../models/user.models";
import { AccountScoresType, ScoreType } from "../types/user";

export async function getAllMaxScore(req: Request, res: Response) {
  const { accountName } = req.body;
  try {
    const accountScores: AccountScoresType | null = await UserModel.findOne({
      accountName,
    })
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

    res.status(201).json(scores);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function storeNewScore(req: Request, res: Response) {
  const { level, user, score } = req.body;
  try {
    const existUser = await UserModel.findOne({ _id: user });

    if (!existUser) return res.status(400).send("This Account is not exists");

    const isThereMaxScore = await QuizModel.find({
      user,
      level,
      isMaxScore: true,
    });

    let isMaxScoreBoolean = false;

    if (isThereMaxScore){
      if(isThereMaxScore.length === 1) {
      if (isThereMaxScore[0].score < score){
        await QuizModel.findByIdAndUpdate(
          isThereMaxScore[0]._id,
          { isMaxScore: false },
          { runValidator: true, new: true }
        );
        isMaxScoreBoolean = true;
      }
    } else if (isThereMaxScore.length === 0){
      (isMaxScoreBoolean = true);
    } else {
      return res.status(400).send("Too Many Max Score");
    }
  }

    const newScore = await QuizModel.create({
      level,
      score,
      user: existUser._id,
      isMaxScore: isMaxScoreBoolean,
    });

    const updateUserScore = await UserModel.findByIdAndUpdate(
      existUser._id,
      { $push: { hiraganaScore: [newScore._id] } },
      { runValidator: true, new: true }
    );

    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error });
  }
}
