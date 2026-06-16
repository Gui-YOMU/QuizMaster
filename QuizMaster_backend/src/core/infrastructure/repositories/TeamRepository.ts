import { CreateTeamDto } from "../../application/dtos/Team/CreateTeamDto.js";
import { UpdateTeamDto } from "../../application/dtos/Team/UpdateTeamDto.js";
import { TeamInterface } from "../../domain/ports/TeamInterface.js";

export class TeamRepository implements TeamInterface {
    createTeam(team: CreateTeamDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateTeam(id: number, team: UpdateTeamDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteTeam(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
  
}