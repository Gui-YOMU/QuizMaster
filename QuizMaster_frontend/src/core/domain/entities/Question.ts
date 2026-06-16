export interface QuestionParams {
    id?: number;
    type?: string;
    subject?: string;
    query: string;
    timer: number;
    points: number;
    id_quiz: number;
    answerIds: number[];
    itemIds: number[];
    teamToQuestionIds: number[];
}

export class Question {
    readonly id: number | null;
    type: string | null;
    subject: string | null;
    query: string;
    timer: number;
    points: number;
    id_quiz: number;
    readonly answerIds: number[];
    readonly itemIds: number[];
    readonly teamToQuestionIds: number[];

    constructor({ id, type, subject, query, timer, points, id_quiz, answerIds, itemIds, teamToQuestionIds }: QuestionParams) {
        this.id = id ?? null;
        this.type = type ?? null;
        this.subject = subject ?? null;
        this.query = query;
        this.timer = timer;
        this.points = points;
        this.id_quiz = id_quiz;
        this.answerIds = answerIds;
        this.itemIds = itemIds;
        this.teamToQuestionIds = teamToQuestionIds;
    }
}