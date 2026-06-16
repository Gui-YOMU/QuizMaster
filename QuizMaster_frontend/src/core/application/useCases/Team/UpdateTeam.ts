import type { TeamRepository } from "../../../domain/ports/TeamRepository";
import type { UpdateTeamDto } from "../../dtos/Team/UpdateTeamDto";

export class UpdateTeam {
  private readonly teamRepository: TeamRepository;

  constructor(teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  async execute(id: number, team: UpdateTeamDto): Promise<void> {
    return this.teamRepository.updateTeam(id, team);
  }
}
