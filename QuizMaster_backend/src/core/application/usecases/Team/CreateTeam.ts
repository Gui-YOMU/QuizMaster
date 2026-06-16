import { TeamInterface } from "../../../domain/ports/TeamInterface.js";
import type { CreateTeamDto } from "../../dtos/Team/CreateTeamDto.js";

export class CreateTeam {
  private teamInterface: TeamInterface;

  constructor(teamInterface: TeamInterface) {
    this.teamInterface = teamInterface;
  }

  async execute(team: CreateTeamDto): Promise<void> {
    return this.teamInterface.createTeam(team);
  }
}
