import { TeamInterface } from "../../../domain/ports/TeamInterface.js";

export class DeleteTeam {
  private teamInterface: TeamInterface;

  constructor(teamInterface: TeamInterface) {
    this.teamInterface = teamInterface;
  }

  async execute(id: number): Promise<void> {
    return this.teamInterface.deleteTeam(id);
  }
}
