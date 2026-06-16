export interface TeamParams {
    id?: number;
    teamName: string;
    teamScore?: number;
    teamRank?: number;
    teamBadAnswers?: number;
    id_room: number;
    teamToQuestionIds: number[];
    userIds: number[];
}

export class Team {
    readonly id: number | null;
    teamName: string;
    teamScore: number | null;
    teamRank: number | null;
    teamBadAnswers: number | null;
    id_room: number;
    readonly teamToQuestionIds: number[];
    readonly userIds: number[];

    constructor({ id, teamName, teamScore, teamRank, teamBadAnswers, id_room, teamToQuestionIds, userIds }: TeamParams) {
        this.id = id ?? null;
        this.teamName = teamName;
        this.teamScore = teamScore ?? 0;
        this.teamRank = teamRank ?? null;
        this.teamBadAnswers = teamBadAnswers ?? 0;
        this.id_room = id_room;
        this.teamToQuestionIds = teamToQuestionIds;
        this.userIds = userIds;
    }
}