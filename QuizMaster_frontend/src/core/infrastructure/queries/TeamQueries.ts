// import { mutationOptions } from "@tanstack/react-query";
// import { container } from "../../../config/container";
// import type { CreateTeamDto } from "../../application/dtos/Team/CreateTeamDto";
// import type { UpdateTeamDto } from "../../application/dtos/Team/UpdateTeamDto";

// export const TeamQueries = {
//   createTeam: () =>
//     mutationOptions({
//       mutationKey: ["teams", "create"],
//       mutationFn: (team: CreateTeamDto) =>
//         container.team.createTeam.execute(team),
//     }),
//   updateTeam: () =>
//     mutationOptions({
//       mutationKey: ["teams", "update"],
//       mutationFn: ({ id, team }: { id: number; team: UpdateTeamDto }) =>
//         container.team.updateTeam.execute(id, team),
//     }),
//   deleteTeam: () =>
//     mutationOptions({
//       mutationKey: ["teams", "delete"],
//       mutationFn: (id: number) => container.team.deleteTeam.execute(id),
//     }),
// };
