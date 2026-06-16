export interface AnswerParams {
    id?: number;
    letter?: string;
    value: string;
    isGoodAnswer: boolean;
    id_question: number;
}

export class Answer {
    readonly id: number | null;
    letter: string | null;
    value: string;
    isGoodAnswer: boolean;
    id_question: number;

    constructor({ id, letter, value, isGoodAnswer, id_question }: AnswerParams) {
        this.id = id ?? null;
        this.letter = letter ?? null;
        this.value = value;
        this.isGoodAnswer = isGoodAnswer;
        this.id_question = id_question;
    }
}