import { Server, Socket } from "socket.io";
import { GetAllQuestionsByQuiz } from "../../../core/application/usecases/Question/GetAllQuestionsByQuiz.js";
import { QuestionRepository } from "../../../core/infrastructure/repositories/QuestionRepository.js";
import { rooms } from "../roomParams.js";
import { GetAllAnswersByQuestion } from "../../../core/application/usecases/Answer/GetAnswersByQuestion.js";
import { AnswerRepository } from "../../../core/infrastructure/repositories/AnswerRepository.js";

export const quizHandlers = (io: Server, socket: Socket) => {
  socket.on("start-quiz", async ({ roomCode }: { roomCode: string }) => {
    const room = rooms[roomCode];
    if (!room) {
      return socket.emit("error", "Salle inexistante.");
    }
    if (room.host !== socket.id) {
      return socket.emit("error", "Seul l'hôte peut démarrer le quiz.");
    }

    const questions = await new GetAllQuestionsByQuiz(
      new QuestionRepository(),
    ).execute(room.quizId);

    room.questions = questions;
    room.currentQuestion = 0;

    const answers = await new GetAllAnswersByQuestion(
      new AnswerRepository(),
    ).execute(room.questions[room.currentQuestion].id);

    room.answers = answers;

    io.to(roomCode).emit("view-question", room.questions[room.currentQuestion], room.answers);

    console.log(`Question ${room.currentQuestion + 1} affichée`);
  });

  socket.on("next-question", async ({ roomCode }: { roomCode: string }) => {
    const room = rooms[roomCode];
    if (!room) {
      return socket.emit("error", "Salle inexistante.");
    }
    if (room.host !== socket.id) {
      return socket.emit(
        "error",
        "Seul l'hôte peut passer à la question suivante.",
      );
    }

    room.currentQuestion++;

    if (room.currentQuestion >= room.questions.length) {
      io.to(roomCode).emit("quiz-ended", room.players);
      return;
    }

    const answers = await new GetAllAnswersByQuestion(
      new AnswerRepository(),
    ).execute(room.questions[room.currentQuestion].id);

    room.answers = answers;

    io.to(roomCode).emit("view-question", room.questions[room.currentQuestion], room.answers);

    console.log(`Question ${room.currentQuestion + 1} affichée`);
  });
};
