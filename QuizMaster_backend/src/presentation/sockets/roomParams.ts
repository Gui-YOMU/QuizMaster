import { AnswerEty } from "../../core/domain/entities/AnswerEty.js";
import { QuestionEty } from "../../core/domain/entities/QuestionEty.js";

export type Player = { id: number; name: string; score: number };

export type Room = {
  host: string;
  hostId: string;
  quizId: number;
  players: Player[];
  questions: QuestionEty[];
  currentQuestion: number;
  answers: AnswerEty[];
};

export const rooms: Record<string, Room> = {};
