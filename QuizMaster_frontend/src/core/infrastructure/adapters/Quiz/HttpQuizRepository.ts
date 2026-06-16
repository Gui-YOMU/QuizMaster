import type { CreateQuizDto } from "../../../application/dtos/Quiz/CreateQuizDto";
import type { UpdateQuizDto } from "../../../application/dtos/Quiz/UpdateQuizDto";
import { Quiz } from "../../../domain/entities/Quiz";
import type { QuizRepository } from "../../../domain/ports/QuizRepository";
import fetchApi from "../FetchApi";

interface RawQuiz {
  id: number;
  quizName: string;
  description?: string;
  id_user: number;
  questionIds: number[];
  roomIds: number[];
}

const API_URL = import.meta.env.VITE_API_URL

export class HttpQuizRepository implements QuizRepository {
  async findAllQuizByUser(userId: number): Promise<Quiz[]> {
    const response = await fetchApi(`${API_URL}/quiz/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const data = await response.json();
    const rawQuizList: RawQuiz[] = data.quizList;
    return rawQuizList.map((rawQuiz) => new Quiz(rawQuiz));
  }

  async findQuizById(id: number): Promise<Quiz | null> {
    const response = await fetchApi(`${API_URL}/quiz/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return new Quiz(data.quiz);
    }
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    return null;
  }

  async createQuiz(quiz: CreateQuizDto): Promise<Quiz> {
    const response = await fetchApi(`${API_URL}/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const data = await response.json();
    return new Quiz(data.quiz);
  }

  async updateQuiz(id: number, quiz: UpdateQuizDto): Promise<void> {
    const response = await fetchApi(`${API_URL}/quiz/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
  }

  async deleteQuiz(id: number): Promise<void> {
    const response = await fetchApi(`${API_URL}/quiz/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
  }
}
