import type { CreateTeamDto } from "../../application/dtos/Team/CreateTeamDto";
import type { UpdateTeamDto } from "../../application/dtos/Team/UpdateTeamDto";

export interface TeamRepository {
  createTeam(team: CreateTeamDto): Promise<void>;

  updateTeam(id: number, team: UpdateTeamDto): Promise<void>;

  deleteTeam(id: number): Promise<void>;
}
