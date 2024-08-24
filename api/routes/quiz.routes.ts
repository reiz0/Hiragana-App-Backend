import { Router } from "express";
import { getMaxScoreByUser } from "../controllers/quiz.controllers";

export const QuizRouter = Router();

QuizRouter.get("/:levels/:user", getMaxScoreByUser);
