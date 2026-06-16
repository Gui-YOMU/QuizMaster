import type { TeamToQuestionRepository } from "../../../domain/ports/TeamToQuestionRepository";

export class DeleteTeamToQuestion {
  private readonly teamToQuestionRepository: TeamToQuestionRepository;

  constructor(teamToQuestionRepository: TeamToQuestionRepository) {
    this.teamToQuestionRepository = teamToQuestionRepository;
  }

  async execute(id: number): Promise<void> {
    return this.teamToQuestionRepository.deleteTeamToQuestion(id);
  }
}
