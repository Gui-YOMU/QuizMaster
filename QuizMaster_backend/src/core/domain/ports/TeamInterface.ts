import type { CreateTeamDto } from "../../application/dtos/Team/CreateTeamDto.js";
import type { UpdateTeamDto } from "../../application/dtos/Team/UpdateTeamDto.js";

export interface TeamInterface {
  createTeam(team: CreateTeamDto): Promise<void>;

  updateTeam(id: number, team: UpdateTeamDto): Promise<void>;

  deleteTeam(id: number): Promise<void>;
}
