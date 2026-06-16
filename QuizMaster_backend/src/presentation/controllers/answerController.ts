import { Request, Response } from "express";
import { AppError } from "../../core/domain/errors/AppError.js";
import { CreateAnswers, DeleteAnswers, GetAllAnswersByQuestion, GetAnswerById } from "../../core/application/usecases/Answer/index.js";
import { AnswerRepository } from "../../core/infrastructure/repositories/AnswerRepository.js";
import { AnswerMapper } from "../../core/infrastructure/mappers/AnswerMapper.js";

export async function getAllAnswersByQuestion(req: Request, res: Response) {
  const useCase = new GetAllAnswersByQuestion(new AnswerRepository());
  const questionId = req.params.questionId;

  if (!questionId || Array.isArray(questionId)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    const answersList = await useCase.execute(parseInt(questionId));
    res.status(200).json({
      success: "Liste des réponses de la question récupérée.",
      answers: answersList,
    })
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la récupération des réponses de la question." });
  }
}

export async function getAnswerById(req: Request, res: Response) {
  const useCase = new GetAnswerById(new AnswerRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    const answer = await useCase.execute(parseInt(id));
    res.status(200).json({
      success: "Informations de la réponse récupérées.",
      answer,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la récupération de la réponse." });
  }
}

export async function createAnswers(req: Request, res: Response) {
  const useCase = new CreateAnswers(new AnswerRepository());

  try {
    const response = await useCase.execute(req.body);
    console.log(response);
    res
      .status(201)
      .json({ success: "La ou les réponses ont été créées avec succès.", answers: response });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La création des réponses a échoué." });
    }
  }
}

export async function deleteAnswers(req: Request, res: Response) {
  const useCase = new DeleteAnswers(new AnswerRepository());
  const questionId = req.params.questionId;

  if (!questionId || Array.isArray(questionId)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    await useCase.execute(parseInt(questionId));
    res.status(201).json({ success: "Les réponses ont été supprimées avec succès." });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La suppression des réponses a échoué." });
    }
  }
}