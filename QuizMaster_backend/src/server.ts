import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { answerRouter } from "./presentation/routers/answerRouter.js";
import { itemRouter } from "./presentation/routers/itemRouter.js";
import { userRouter } from "./presentation/routers/userRouter.js";
import { quizRouter } from "./presentation/routers/quizRouter.js";
import { questionRouter } from "./presentation/routers/questionRouter.js";
import { roomRouter } from "./presentation/routers/roomRouter.js";
import { teamRouter } from "./presentation/routers/teamRouter.js";
import { teamToQuestionRouter } from "./presentation/routers/teamToQuestionRouter.js";
import { refreshToken } from "./presentation/middlewares/refreshToken.js";
import { createServer } from "node:http";
import { socketHandlers } from "./presentation/sockets/index.js";

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

socketHandlers(io);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ page: "login" });
});

app.post("/refresh", refreshToken);

app.use(userRouter);
app.use(quizRouter);
app.use(questionRouter);
app.use(answerRouter);
app.use(itemRouter);
app.use(roomRouter);
app.use(teamRouter);
app.use(teamToQuestionRouter);

server.listen(PORT, () => {
  console.log(`Connecté avec succès au serveur localhost:${PORT}.`);
});

server.on("error", (error) => {
  console.error(error);
})
