import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { container } from "../../../config/container.ts";
import type { CreateUserDto } from "../../application/dtos/User/CreateUserDto.ts";
import type { UpdateUserDto } from "../../application/dtos/User/UpdateUserDto.ts";

export const UserQueries = {
  findAllUsers: () =>
    queryOptions({
      queryKey: ["users"],
      queryFn: () => container.user.getAllUsers.execute(),
    }),
  findUserByMail: () =>
    mutationOptions({
      mutationKey: ["users", "login"],
      mutationFn: ({ mail, password }: { mail: string; password: string }) =>
        container.user.getUserByMail.execute(mail, password),
    }),
  findUserById: (id: number) =>
    queryOptions({
      queryKey: ["users", id],
      queryFn: () => container.user.getUserById.execute(id),
    }),
  createUser: () =>
    mutationOptions({
      mutationKey: ["users", "create"],
      mutationFn: (user: CreateUserDto) =>
        container.user.createUser.execute(user),
    }),
  updateUser: () =>
    mutationOptions({
      mutationKey: ["users", "update"],
      mutationFn: ({ id, user }: { id: number; user: UpdateUserDto }) =>
        container.user.updateUser.execute(id, user),
    }),
  deleteUser: () =>
    mutationOptions({
      mutationKey: ["users", "delete"],
      mutationFn: (id: number) => container.user.deleteUser.execute(id),
    }),
};
