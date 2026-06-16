import { CreateTeamToQuestionDto } from "../../application/dtos/TeamToQuestion/CreateTeamToQuestionDto.js";
import { UpdateTeamToQuestionDto } from "../../application/dtos/TeamToQuestion/UpdateTeamToQuestionDto.js";
import { TeamToQuestionInterface } from "../../domain/ports/TeamToQuestionInterface.js";

export class TeamToQuestionRepository implements TeamToQuestionInterface {
    createTeamToQuestion(teamToQuestion: CreateTeamToQuestionDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateTeamToQuestion(id: number, teamToQuestion: UpdateTeamToQuestionDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteTeamToQuestion(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
  
}