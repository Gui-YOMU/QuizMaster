// import { mutationOptions } from "@tanstack/react-query";
// import { container } from "../../../config/container";
// import type { CreateTeamToQuestionDto } from "../../application/dtos/TeamToQuestion/CreateTeamToQuestionDto";
// import type { UpdateTeamToQuestionDto } from "../../application/dtos/TeamToQuestion/UpdateTeamToQuestionDto";

// export const TeamToQuestionQueries = {
//   createTeamToQuestion: () =>
//     mutationOptions({
//       mutationKey: ["teamToQuestions", "create"],
//       mutationFn: (teamToQuestion: CreateTeamToQuestionDto) =>
//         container.teamToQuestion.createTeamToQuestion.execute(teamToQuestion),
//     }),
//   updateTeamToQuestion: () =>
//     mutationOptions({
//       mutationKey: ["teamToQuestions", "update"],
//       mutationFn: ({
//         id,
//         teamToQuestion,
//       }: {
//         id: number;
//         teamToQuestion: UpdateTeamToQuestionDto;
//       }) =>
//         container.teamToQuestion.updateTeamToQuestion.execute(
//           id,
//           teamToQuestion,
//         ),
//     }),
//   deleteTeamToQuestion: () =>
//     mutationOptions({
//       mutationKey: ["teamToQuestions", "delete"],
//       mutationFn: (id: number) =>
//         container.teamToQuestion.deleteTeamToQuestion.execute(id),
//     }),
// };
