import type { CreateQuestionDto } from "../../../application/dtos/Question/CreateQuestionDto";
import type { UpdateQuestionDto } from "../../../application/dtos/Question/UpdateQuestionDto";
import { Question } from "../../../domain/entities/Question";
import type { QuestionRepository } from "../../../domain/ports/QuestionRepository";
import fetchApi from "../FetchApi";

interface RawQuestion {
  id: number;
  type: string;
  subject: string;
  query: string;
  timer: number;
  points: number;
  id_quiz: number;
  answerIds: number[];
  itemIds: number[];
  teamToQuestionIds: number[];
}

const API_URL = import.meta.env.VITE_API_URL

export class HttpQuestionRepository implements QuestionRepository {
  async findAllQuestionsByQuiz(quizId: number): Promise<Question[]> {
    const response = await fetchApi(`${API_URL}/questions/quiz/${quizId}`, {
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
    const rawQuestionList: RawQuestion[] = data.questionsList;
    return rawQuestionList.map((rawQuestion) => new Question(rawQuestion));
  }

  async findQuestionById(id: number): Promise<Question | null> {
    const response = await fetchApi(`${API_URL}/questions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return new Question(data.question);
    }
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    return null;
  }

  async createQuestion(question: CreateQuestionDto): Promise<Question> {
    const response = await fetchApi(`${API_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const data = await response.json();
    return new Question(data.question);
  }

  async updateQuestion(id: number, question: UpdateQuestionDto): Promise<void> {
    const response = await fetchApi(`${API_URL}/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
  }

  async deleteQuestion(id: number): Promise<void> {
    const response = await fetchApi(`${API_URL}/questions/${id}`, {
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
