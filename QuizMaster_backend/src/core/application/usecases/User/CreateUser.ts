import { AppError } from "../../../domain/errors/AppError.js";
import { UserInterface } from "../../../domain/ports/UserInterface.js";
import { CreateUserDto } from "../../dtos/User/CreateUserDto.js";
import bcrypt from "bcrypt";
import escape from "escape-html";

export class CreateUser {
  private userInterface: UserInterface;

  constructor(userInterface: UserInterface) {
    this.userInterface = userInterface;
  }

  async execute(user: CreateUserDto) {
    const existingUser = await this.userInterface.findUserByMail(user.mail);
    if (!existingUser) {
      if (user.surname) {
        const existingSurname = await this.userInterface.findUserBySurname(
          user.surname,
        );
        if (existingSurname) {
          throw new AppError({
          statusCode: 409,
          message: "Ce surnom est déjà utilisé.",
        });
        }
      }
      if (user.password === user.confirmPassword) {
        const hashedPassword = await bcrypt.hash(escape(user.password), 10);
        await this.userInterface.createUser({
          ...user,
          password: hashedPassword,
        });
      } else {
        throw new AppError({
          statusCode: 400,
          message: "Les mots de passe ne correspondent pas.",
        });
      }
    } else {
      throw new AppError({
        statusCode: 409,
        message: "Ce mail est déjà utilisé.",
      });
    }
  }
}
