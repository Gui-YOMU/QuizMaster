import { TeamToQuestionInterface } from "../../../domain/ports/TeamToQuestionInterface.js";

export class DeleteTeamToQuestion {
  private teamToQuestionInterface: TeamToQuestionInterface;

  constructor(teamToQuestionInterface: TeamToQuestionInterface) {
    this.teamToQuestionInterface = teamToQuestionInterface;
  }

  async execute(id: number): Promise<void> {
    return this.teamToQuestionInterface.deleteTeamToQuestion(id);
  }
}
