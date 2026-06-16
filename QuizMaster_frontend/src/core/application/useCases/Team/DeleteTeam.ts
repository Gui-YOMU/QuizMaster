import type { TeamRepository } from "../../../domain/ports/TeamRepository";

export class DeleteTeam {
  private readonly teamRepository: TeamRepository;

  constructor(teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  async execute(id: number): Promise<void> {
    return this.teamRepository.deleteTeam(id);
  }
}
