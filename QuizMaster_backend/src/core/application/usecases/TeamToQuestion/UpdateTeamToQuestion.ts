import { TeamToQuestionInterface } from "../../../domain/ports/TeamToQuestionInterface.js";
import type { UpdateTeamToQuestionDto } from "../../dtos/TeamToQuestion/UpdateTeamToQuestionDto.js";

export class UpdateTeamToQuestion {
  private teamToQuestionInterface: TeamToQuestionInterface;

  constructor(teamToQuestionInterface: TeamToQuestionInterface) {
    this.teamToQuestionInterface = teamToQuestionInterface;
  }

  async execute(
    id: number,
    teamToQuestion: UpdateTeamToQuestionDto,
  ): Promise<void> {
    return this.teamToQuestionInterface.updateTeamToQuestion(
      id,
      teamToQuestion,
    );
  }
}
