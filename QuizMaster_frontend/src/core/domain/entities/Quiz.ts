export interface QuizParams {
    id?: number;
    quizName: string;
    description?: string;
    id_user: number;
    questionIds: number[];
    roomIds: number[];
}

export class Quiz {
    readonly id: number | null;
    quizName: string;
    description: string | null;
    id_user: number;
    readonly questionIds: number[];
    readonly roomIds: number[];

    constructor({ id, quizName, description, id_user, questionIds, roomIds }: QuizParams) {
        this.id = id ?? null;
        this.quizName = quizName;
        this.description = description ?? null;
        this.id_user = id_user;
        this.questionIds = questionIds;
        this.roomIds = roomIds;
    }
}