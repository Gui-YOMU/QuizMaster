import type { CreateAnswerDto } from "../../../application/dtos/Answer/CreateAnswerDto";
import { Answer } from "../../../domain/entities/Answer";
import type { AnswerRepository } from "../../../domain/ports/AnswerRepository";
import fetchApi from "../FetchApi";

interface RawAnswer {
  id: number;
  letter: string;
  value: string;
  isGoodAnswer: boolean;
  id_question: number;
}

const API_URL = import.meta.env.VITE_API_URL

export class HttpAnswerRepository implements AnswerRepository {
  async deleteAnswers(questionId: number): Promise<void> {
    const response = await fetchApi(`${API_URL}/answers/question/${questionId}`, {
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

  async findAllAnswersByQuestion(questionId: number): Promise<Answer[]> {
    const response = await fetchApi(`${API_URL}/answers/question/${questionId}`, {
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
        const rawAnswerList: RawAnswer[] = data.answers;
        return rawAnswerList.map((rawAnswer) => new Answer(rawAnswer));
  }

  async findAnswerById(id: number): Promise<Answer | null> {
    const response = await fetchApi(`${API_URL}/answers/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          return new Answer(data.answer);
        }
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }
        return null;
  }

  async createAnswers(answers: CreateAnswerDto[]): Promise<Answer[]> {
    const response = await fetchApi(`${API_URL}/answers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }
        const data = await response.json();
        const rawAnswerList: RawAnswer[] = data.answers;
        return rawAnswerList.map((rawAnswer) => new Answer(rawAnswer));
  }
}
