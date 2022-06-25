export type Categories = {
    id: number,
    name: string
}

export enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

export type Question = {
    response_code: number,
    results: Array<QuizResponse>
}

type QuizResponse = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: Array<string>
    question: string,
    type: string
}
