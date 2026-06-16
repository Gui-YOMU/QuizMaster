import type { CreateTeamToQuestionDto } from "../../application/dtos/TeamToQuestion/CreateTeamToQuestionDto";
import type { UpdateTeamToQuestionDto } from "../../application/dtos/TeamToQuestion/UpdateTeamToQuestionDto";

export interface TeamToQuestionRepository {
  createTeamToQuestion(teamToQuestion: CreateTeamToQuestionDto): Promise<void>;

  updateTeamToQuestion(
    id: number,
    teamToQuestion: UpdateTeamToQuestionDto,
  ): Promise<void>;

  deleteTeamToQuestion(id: number): Promise<void>;
}
