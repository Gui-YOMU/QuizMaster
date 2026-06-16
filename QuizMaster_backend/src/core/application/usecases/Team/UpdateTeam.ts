import { TeamInterface } from "../../../domain/ports/TeamInterface.js";
import type { UpdateTeamDto } from "../../dtos/Team/UpdateTeamDto.js";

export class UpdateTeam {
  private teamInterface: TeamInterface;

  constructor(teamInterface: TeamInterface) {
    this.teamInterface = teamInterface;
  }

  async execute(id: number, team: UpdateTeamDto): Promise<void> {
    return this.teamInterface.updateTeam(id, team);
  }
}
