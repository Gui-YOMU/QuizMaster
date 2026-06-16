export interface RoomParams {
    id?: number;
    roomName: string;
    roomCode: string;
    id_user: number;
    id_quiz: number;
    teamIds: number[];
    teamToQuestionIds: number[];
}

export class Room {
    readonly id: number | null;
    roomName: string;
    roomCode: string;
    id_user: number;
    id_quiz: number;
    readonly teamIds: number[];
    readonly teamToQuestionIds: number[];

    constructor({ id, roomName, roomCode, id_user, id_quiz, teamIds, teamToQuestionIds }: RoomParams) {
        this.id = id ?? null;
        this.roomName = roomName;
        this.roomCode = roomCode;
        this.id_user = id_user;
        this.id_quiz = id_quiz;
        this.teamIds = teamIds;
        this.teamToQuestionIds = teamToQuestionIds;
    }
}