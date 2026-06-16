import { Request, Response } from "express";
import { AppError } from "../../core/domain/errors/AppError.js";
import { CreateQuestion, DeleteQuestion, GetAllQuestionsByQuiz, GetQuestionById, UpdateQuestion } from "../../core/application/usecases/Question/index.js";
import { QuestionRepository } from "../../core/infrastructure/repositories/QuestionRepository.js";

export async function getAllQuestionsByQuiz(req: Request, res: Response) {
  const useCase = new GetAllQuestionsByQuiz(new QuestionRepository());
  const quizId = req.params.quizId;

  if (!quizId || Array.isArray(quizId)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    const questionsList = await useCase.execute(parseInt(quizId));
    res.status(200).json({
      success: "Liste des questions du quiz récupérée.",
      questionsList,
    })
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la récupération des questions du quiz." });
  }
}

export async function getQuestionById(req: Request, res: Response) {
  const useCase = new GetQuestionById(new QuestionRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    const question = await useCase.execute(parseInt(id));
    res.status(200).json({
      success: "Informations du quiz récupérées.",
      question,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la récupération du quiz." });
  }
}

export async function createQuestion(req: Request, res: Response) {
  const useCase = new CreateQuestion(new QuestionRepository());

  try {
    const response = await useCase.execute(req.body);
    console.log(response);
    res
      .status(201)
      .json({ success: "La question a été créée avec succès.", question: response });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La création de la question a échoué." });
    }
  }
}

export async function updateQuestion(req: Request, res: Response) {
  const useCase = new UpdateQuestion(new QuestionRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    await useCase.execute(parseInt(id), req.body);
    res.status(201).json({ success: "La question a été modifié avec succès." });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La modification de la question a échoué." });
    }
  }
}

export async function deleteQuestion(req: Request, res: Response) {
  const useCase = new DeleteQuestion(new QuestionRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    await useCase.execute(parseInt(id));
    res.status(201).json({ success: "La question a été supprimé avec succès." });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La suppression de la question a échoué." });
    }
  }
}