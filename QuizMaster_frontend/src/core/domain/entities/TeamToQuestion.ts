export interface TeamToQuestionParams {
    id?: number;
    teamAnswer?: string;
    result?: boolean;
    id_room: number;
    id_team: number;
    id_question: number;
}

export class TeamToQuestion {
    readonly id: number | null;
    teamAnswer: string | null;
    result: boolean | null;
    id_room: number;
    id_team: number;
    id_question: number;

    constructor({ id, teamAnswer, result, id_room, id_team, id_question }: TeamToQuestionParams) {
        this.id = id ?? null;
        this.teamAnswer = teamAnswer ?? null;
        this.result = result ?? null;
        this.id_room = id_room;
        this.id_team = id_team;
        this.id_question = id_question;
    }
}