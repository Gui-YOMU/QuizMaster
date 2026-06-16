import {
  CreateUser,
  GetUserByMail,
  GetUserById,
  UpdateUser,
  DeleteUser
} from "../../core/application/usecases/User/index.js";
import { UserRepository } from "../../core/infrastructure/repositories/UserRepository.js";
import { AppError } from "../../core/domain/errors/AppError.js";
import { Request, Response } from "express";
import { UserMapper } from "../../core/infrastructure/mappers/UserMapper.js";

export async function createUser(req: Request, res: Response) {
  const useCase = new CreateUser(new UserRepository());

  try {
    await useCase.execute(req.body);
    res.status(201).json({ success: "Le compte a été créé avec succès." });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La création du compte a échoué." });
    }
  }
}

export async function logUser(req: Request, res: Response) {
  const useCase = new GetUserByMail(new UserRepository());
  const { mail, password } = req.body;

  try {
    const response = await useCase.execute(mail, password);
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });
    res.status(200).json({
      success: "Connexion effectuée avec succès.",
      token: response.accessToken,
      id: response.user.id,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(401).json({ error: "Identifiants incorrects." });
    } else {
      res.status(500).json({ error: "La connexion a échoué." });
    }
  }
}

export async function getDashboard(req: Request, res: Response) {
  const useCase = new GetUserById(new UserRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    const user = await useCase.execute(parseInt(id));
    res.status(200).json({
      success: "Informations du dashboard récupérées.",
      user: UserMapper.toClientUserDto(user),
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de l'affichage du dashboard." });
  }
}

export async function updateUser(req: Request, res: Response) {
  const useCase = new UpdateUser(new UserRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    await useCase.execute(parseInt(id), req.body);
    res.status(201).json({ success: "Le profil a été modifié avec succès." });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La modification du compte a échoué." });
    }
  }
}

export async function deleteUser(req: Request, res: Response) {
  const useCase = new DeleteUser(new UserRepository());
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Identifiant manquant." });
  }

  try {
    await useCase.execute(parseInt(id));
    res.status(201).json({ success: "Le profil a été supprimé avec succès." });
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "La suppression du compte a échoué." });
    }
  }
}
