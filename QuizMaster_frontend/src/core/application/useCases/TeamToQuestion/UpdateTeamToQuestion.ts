import type { TeamToQuestionRepository } from "../../../domain/ports/TeamToQuestionRepository";
import type { UpdateTeamToQuestionDto } from "../../dtos/TeamToQuestion/UpdateTeamToQuestionDto";

export class UpdateTeamToQuestion {
  private readonly teamToQuestionRepository: TeamToQuestionRepository;

  constructor(teamToQuestionRepository: TeamToQuestionRepository) {
    this.teamToQuestionRepository = teamToQuestionRepository;
  }

  async execute(
    id: number,
    teamToQuestion: UpdateTeamToQuestionDto,
  ): Promise<void> {
    return this.teamToQuestionRepository.updateTeamToQuestion(
      id,
      teamToQuestion,
    );
  }
}
