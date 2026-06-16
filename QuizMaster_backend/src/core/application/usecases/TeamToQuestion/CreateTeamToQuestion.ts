import { TeamToQuestionInterface } from "../../../domain/ports/TeamToQuestionInterface.js";
import type { CreateTeamToQuestionDto } from "../../dtos/TeamToQuestion/CreateTeamToQuestionDto.js";

export class CreateTeamToQuestion {
  private teamToQuestionInterface: TeamToQuestionInterface;

  constructor(teamToQuestionInterface: TeamToQuestionInterface) {
    this.teamToQuestionInterface = teamToQuestionInterface;
  }

  async execute(teamToQuestion: CreateTeamToQuestionDto): Promise<void> {
    return this.teamToQuestionInterface.createTeamToQuestion(teamToQuestion);
  }
}
