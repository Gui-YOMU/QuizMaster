export interface ItemParams {
    id?: number;
    content: string;
    id_question: number;
}

export class Item {
    readonly id: number | null;
    content: string;
    id_question: number;

    constructor({ id, content, id_question }: ItemParams) {
        this.id = id ?? null;
        this.content = content;
        this.id_question = id_question;
    }
}