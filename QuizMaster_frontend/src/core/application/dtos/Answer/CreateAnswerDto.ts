export interface CreateAnswerDto {
    letter?: string,
    value: string,
    isGoodAnswer: boolean,
    id_question: number,
}