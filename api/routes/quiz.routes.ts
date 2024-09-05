import { Router } from "express";
import { getAllMaxScore, storeNewScore } from "../controllers/quiz.controllers";

export const QuizRouter = Router();

QuizRouter.post("/getAllMaxScore", getAllMaxScore);
QuizRouter.post("/storeNewScore", storeNewScore);
