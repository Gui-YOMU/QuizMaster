import {
  prisma,
  prismaExtended,
} from "../../infrastructure/database/prisma.js";
import { CreateUserDto } from "../../application/dtos/User/CreateUserDto.js";
import { UserEty } from "../../domain/entities/UserEty.js";
import { UserInterface } from "../../domain/ports/UserInterface.js";
import { Prisma } from "../generated/prisma/client.js";
import { AppError } from "../../domain/errors/AppError.js";
import { UserMapper } from "../mappers/UserMapper.js";
import { UpdateUserDto } from "../../application/dtos/User/UpdateUserDto.js";

export class UserRepository implements UserInterface {
  async findAllUsers(): Promise<UserEty[]> {
    const users = await prisma.user.findMany({
      include: { quiz: true, rooms: true, teams: true },
    });
    return users ? users.map((user) => UserMapper.toDomain(user)) : [];
  }

  async findUserByMail(mail: string, password?: string): Promise<UserEty | null> {
    const user = await prisma.user.findUnique({
      where: { mail },
      include: { quiz: true, rooms: true, teams: true },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findUserById(id: number): Promise<UserEty | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { quiz: true, rooms: true, teams: true },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findUserBySurname(surname: string): Promise<UserEty | null> {
    const user = await prisma.user.findUnique({
      where: { surname },
      include: { quiz: true, rooms: true, teams: true },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async createUser(user: CreateUserDto): Promise<void> {
    try {
      await prismaExtended.user.create({
        data: {
          lastName: user.lastName,
          firstName: user.firstName,
          surname: user.surname,
          mail: user.mail,
          password: user.password,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError({
          statusCode: 409,
          message: "Ce mail est déjà utilisé.",
        });
      }
      throw error;
    }
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<void> {
    try {
      await prismaExtended.user.update({
        where: { id },
        data: {
          lastName: user.lastName,
          firstName: user.firstName,
          surname: user.surname,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError({
          statusCode: 409,
          message: "Ce surnom est déjà utilisé.",
        });
      }
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
