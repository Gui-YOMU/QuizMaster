import { AppError } from "../../../domain/errors/AppError.js";
import { UserInterface } from "../../../domain/ports/UserInterface.js";
import { UpdateUserDto } from "../../dtos/User/UpdateUserDto.js";

export class UpdateUser {
  private userInterface: UserInterface;

  constructor(userInterface: UserInterface) {
    this.userInterface = userInterface;
  }

  async execute(id: number, user: UpdateUserDto) {
    const existingUser = await this.userInterface.findUserById(id);
    if (!existingUser) {
      throw new AppError({
        statusCode: 404,
        message: "Cet utilisateur n'existe pas.",
      });
    }
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
    await this.userInterface.updateUser(id, {
      lastName: user.lastName ?? existingUser.lastName,
      firstName: user.firstName ?? existingUser.firstName,
      surname: user.surname ?? existingUser.surname,
    });
  }
}
