import { Request, Response } from "express";
import {
  CreateQuiz,
  GetQuizById,
  GetAllQuizByUser,
  UpdateQuiz,
  DeleteQuiz,
} from "../../core/application/usecases/Quiz/index.js";
import { AppError } from "../../core/domain/errors/AppError.js";
import { QuizRepository } from "../../core/infrastructure/repositories/QuizRepository.js";

export async function createQuiz(req: Request, res: Response) {
  const useCase = new CreateQuiz(new QuizRepository());

  try {
    const response = await useCase.execute(req.body);
    console.log(response);
    res
      .status(201)
      .json({ success: "Le quiz a été créé avec succès.", quiz: response });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La création du quiz a échoué." });
    }
  }
}

export async function getQuizById(req: Request, res: Response) {
  const useCase = new GetQuizById(new QuizRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    const quiz = await useCase.execute(parseInt(id));
    res.status(200).json({
      success: "Informations du quiz récupérées.",
      quiz,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la récupération du quiz." });
  }
}

export async function getAllQuizByUser(req: Request, res: Response) {
  const useCase = new GetAllQuizByUser(new QuizRepository());
  const userId = req.params.userId;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    const quizList = await useCase.execute(parseInt(userId));
    res.status(200).json({
      success: "Liste des quiz de l'utilisateur récupérée.",
      quizList,
    })
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la récupération des quiz de l'utilisateur." });
  }
}

export async function updateQuiz(req: Request, res: Response) {
  const useCase = new UpdateQuiz(new QuizRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    await useCase.execute(parseInt(id), req.body);
    res.status(201).json({ success: "Le quiz a été modifié avec succès." });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La modification du quiz a échoué." });
    }
  }
}

export async function deleteQuiz(req: Request, res: Response) {
  const useCase = new DeleteQuiz(new QuizRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    await useCase.execute(parseInt(id));
    res.status(201).json({ success: "Le quiz a été supprimé avec succès." });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La suppression du quiz a échoué." });
    }
  }
}