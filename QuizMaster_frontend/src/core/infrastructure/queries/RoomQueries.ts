// import { mutationOptions } from "@tanstack/react-query";
// import { container } from "../../../config/container";
// import type { CreateRoomDto } from "../../application/dtos/Room/CreateRoomDto";
// import type { UpdateRoomDto } from "../../application/dtos/Room/UpdateRoomDto";

// export const RoomQueries = {
//   createRoom: () =>
//     mutationOptions({
//       mutationKey: ["rooms", "create"],
//       mutationFn: (room: CreateRoomDto) =>
//         container.room.createRoom.execute(room),
//     }),
//   updateRoom: () =>
//     mutationOptions({
//       mutationKey: ["rooms", "update"],
//       mutationFn: ({ id, room }: { id: number; room: UpdateRoomDto }) =>
//         container.room.updateRoom.execute(id, room),
//     }),
//   deleteRoom: () =>
//     mutationOptions({
//       mutationKey: ["rooms", "delete"],
//       mutationFn: (id: number) => container.room.deleteRoom.execute(id),
//     }),
// };
