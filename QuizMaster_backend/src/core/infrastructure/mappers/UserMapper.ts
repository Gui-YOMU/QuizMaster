import { ClientUserDto } from "../../application/dtos/User/ClientUserDto.js";
import { UserEty } from "../../domain/entities/UserEty.js";
import { RoleValueObject } from "../../domain/valueobjects/RoleValueObject.js";
import { Prisma, Role } from "../generated/prisma/index.js";

type PrismaUser = Prisma.UserGetPayload<{
  include: {
    quiz: true;
    rooms: true;
    teams: true;
  };
}>;

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): UserEty {
    return new UserEty(
      prismaUser.id,
      prismaUser.lastName,
      prismaUser.firstName,
      prismaUser.surname,
      prismaUser.mail,
      prismaUser.password,
      prismaUser.quiz.map((q) => q.id),
      prismaUser.rooms.map((r) => r.id),
      prismaUser.teams.map((t) => t.id),
      this.mapRole(prismaUser.role),
    );
  }

  static toClientUserDto(user: UserEty): ClientUserDto {
    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      surname: user.surname,
      mail: user.mail,
      role: user.role,
      quizIds: user.quizIds,
      roomIds: user.roomIds,
      teamIds: user.teamIds,
    };
  }

  static mapRole(role: Role): RoleValueObject {
    return role as unknown as RoleValueObject;
  }
}
