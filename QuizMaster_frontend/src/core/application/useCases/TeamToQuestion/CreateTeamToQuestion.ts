import type { TeamToQuestionRepository } from "../../../domain/ports/TeamToQuestionRepository";
import type { CreateTeamToQuestionDto } from "../../dtos/TeamToQuestion/CreateTeamToQuestionDto";

export class CreateTeamToQuestion {
  private readonly teamToQuestionRepository: TeamToQuestionRepository;

  constructor(teamToQuestionRepository: TeamToQuestionRepository) {
    this.teamToQuestionRepository = teamToQuestionRepository;
  }

  async execute(teamToQuestion: CreateTeamToQuestionDto): Promise<void> {
    return this.teamToQuestionRepository.createTeamToQuestion(teamToQuestion);
  }
}
