import type { Role } from "../valueObjects/Role";

export interface UserParams {
    id?: number;
    lastName: string;
    firstName: string;
    surname?: string;
    mail: string;
    password: string;
    role: Role;
    quizIds: number[];
    roomIds: number[];
    teamIds: number[];
}

export class User {
    readonly id: number | null;
    lastName: string;
    firstName: string;
    surname: string | null;
    mail: string;
    password: string;
    readonly role: Role;
    readonly quizIds: number[];
    readonly roomIds: number[];
    readonly teamIds: number[];

    constructor({ id, lastName, firstName, surname, mail, password, role, quizIds, roomIds, teamIds }: UserParams) {
        this.id = id ?? null;
        this.lastName = lastName;
        this.firstName = firstName;
        this.surname = surname ?? null;
        this.mail = mail;
        this.password = password;
        this.role = role;
        this.quizIds = quizIds;
        this.roomIds = roomIds;
        this.teamIds = teamIds;
    }
}