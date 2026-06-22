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
      return socket.emit("room-error", { message: "Salle inexistante." });
    }

    if (room.host !== socket.id) {
      return socket.emit("host-error", {
        message: "Seul l'hôte peut démarrer le quiz.",
      });
    }

    const questions = await new GetAllQuestionsByQuiz(
      new QuestionRepository(),
    ).execute(room.quizId);

    room.questions = questions;
    room.currentQuestion = 0;

    const isLastQuestion = room.currentQuestion === room.questions.length - 1;

    const answers = await new GetAllAnswersByQuestion(
      new AnswerRepository(),
    ).execute(room.questions[room.currentQuestion].id);

    room.answers = answers;

    io.to(roomCode).emit("view-question", {
      question: room.questions[room.currentQuestion],
      answers: room.answers,
      isLastQuestion,
      questionNumber: room.currentQuestion + 1,
    });

    console.log(`Question ${room.currentQuestion + 1} affichée`);
  });

  socket.on("start-timer", ({ roomCode }: { roomCode: string }) => {
    const room = rooms[roomCode];
    if (!room) {
      return socket.emit("room-error", { message: "Salle inexistante." });
    }
    if (room.host !== socket.id) {
      return socket.emit("host-error", {
        message: "Seul l'hôte peut démarrer le timer.",
      });
    }

    const currentQuestion = room.questions[room.currentQuestion];
    let timeLeft = currentQuestion.timer;

    io.to(roomCode).emit("timer", { timeLeft });

    const interval = setInterval(() => {
      timeLeft--;
      io.to(roomCode).emit("timer", { timeLeft });

      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeout(() => {
          io.to(roomCode).emit("timer-ended");
        }, 1000);
      }
    }, 1000);
  });

  socket.on("next-question", async ({ roomCode }: { roomCode: string }) => {
    const room = rooms[roomCode];
    if (!room) {
      return socket.emit("room-error", { message: "Salle inexistante." });
    }
    if (room.host !== socket.id) {
      return socket.emit("host-error", {
        message: "Seul l'hôte peut passer à la question suivante.",
      });
    }

    room.currentQuestion++;

    const isLastQuestion = room.currentQuestion === room.questions.length - 1;

    if (room.currentQuestion >= room.questions.length) {
      io.to(roomCode).emit("quiz-ended", { players: room.players });
      return;
    }

    const answers = await new GetAllAnswersByQuestion(
      new AnswerRepository(),
    ).execute(room.questions[room.currentQuestion].id);

    room.answers = answers;

    io.to(roomCode).emit("view-question", {
      question: room.questions[room.currentQuestion],
      answers: room.answers,
      isLastQuestion,
      questionNumber: room.currentQuestion + 1,
    });

    console.log(`Question ${room.currentQuestion + 1} affichée`);
  });
};
