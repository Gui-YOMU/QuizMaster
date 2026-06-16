import type { CreateTeamToQuestionDto } from "../../application/dtos/TeamToQuestion/CreateTeamToQuestionDto.js";
import type { UpdateTeamToQuestionDto } from "../../application/dtos/TeamToQuestion/UpdateTeamToQuestionDto.js";

export interface TeamToQuestionInterface {
  createTeamToQuestion(teamToQuestion: CreateTeamToQuestionDto): Promise<void>;

  updateTeamToQuestion(
    id: number,
    teamToQuestion: UpdateTeamToQuestionDto,
  ): Promise<void>;

  deleteTeamToQuestion(id: number): Promise<void>;
}
