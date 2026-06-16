import type { TeamRepository } from "../../../domain/ports/TeamRepository";
import type { CreateTeamDto } from "../../dtos/Team/CreateTeamDto";

export class CreateTeam {
  private readonly teamRepository: TeamRepository;
    
      constructor(teamRepository: TeamRepository) {
        this.teamRepository = teamRepository;
      }
    
      async execute(team: CreateTeamDto): Promise<void> {
        return this.teamRepository.createTeam(team);
      }
}
