// import { mutationOptions } from "@tanstack/react-query";
// import { container } from "../../../config/container";
// import type { CreateItemDto } from "../../application/dtos/Item/CreateItemDto";
// import type { UpdateItemDto } from "../../application/dtos/Item/UpdateItemDto";

// export const ItemQueries = {
//   createItem: () =>
//     mutationOptions({
//       mutationKey: ["items", "create"],
//       mutationFn: (item: CreateItemDto) =>
//         container.item.createItem.execute(item),
//     }),
//   updateItem: () =>
//     mutationOptions({
//       mutationKey: ["items", "update"],
//       mutationFn: ({ id, item }: { id: number; item: UpdateItemDto }) =>
//         container.item.updateItem.execute(id, item),
//     }),
//   deleteItem: () =>
//     mutationOptions({
//       mutationKey: ["items", "delete"],
//       mutationFn: (id: number) => container.item.deleteItem.execute(id),
//     }),
// };
