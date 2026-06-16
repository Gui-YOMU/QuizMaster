import { AppError } from "../../../domain/errors/AppError.js";
import { UserInterface } from "../../../domain/ports/UserInterface.js";

export class DeleteUser {
  private userInterface: UserInterface;
  
    constructor(userInterface: UserInterface) {
      this.userInterface = userInterface;
    }

  async execute(id: number) {
    const user = await this.userInterface.findUserById(id);
    if (user) {
      await this.userInterface.deleteUser(id);
      } else {
      throw new AppError({statusCode: 404, message: "L'utilisateur n'existe pas."})
    }
  }
}