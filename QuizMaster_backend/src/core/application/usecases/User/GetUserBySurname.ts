import { AppError } from "../../../domain/errors/AppError.js";
import { UserInterface } from "../../../domain/ports/UserInterface.js";

export class GetUserBySurname {
  private userInterface: UserInterface;
  
    constructor(userInterface: UserInterface) {
      this.userInterface = userInterface;
    }

  async execute(surname: string) {
    const user = await this.userInterface.findUserBySurname(surname);
    if (user) {
      return user;
      } else {
      throw new AppError({statusCode: 404, message: "L'utilisateur n'existe pas."})
    }
  }
}