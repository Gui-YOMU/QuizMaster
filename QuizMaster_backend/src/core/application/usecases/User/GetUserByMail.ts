import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../presentation/middlewares/generateToken.js";
import { AppError } from "../../../domain/errors/AppError.js";
import { UserInterface } from "../../../domain/ports/UserInterface.js";
import bcrypt from "bcrypt";
import escape from "escape-html";

export class GetUserByMail {
  private userInterface: UserInterface;
    
      constructor(userInterface: UserInterface) {
        this.userInterface = userInterface;
      }

  async execute(mail: string, password: string) {
    const user = await this.userInterface.findUserByMail(mail);
    if (user) {
      if (await bcrypt.compare(escape(password), user.password)) {
        const accessToken = generateAccessToken({
          id: user.id,
          role: user.role,
        });
        const refreshToken = generateRefreshToken({
          id: user.id,
        });
        return {
          accessToken,
          refreshToken,
          user,
        };
      } else {
        throw new AppError({
          statusCode: 401,
          message: "Le mot de passe est incorrect.",
        });
      }
    } else {
      throw new AppError({
        statusCode: 404,
        message: "L'utilisateur n'existe pas.",
      });
    }
  }
}
