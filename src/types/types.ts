export type Categories = {
    id: number,
    name: string
}

export enum Difficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard'
}

export type Question = {
    response_code: number,
    results: [{
        category: string,
        correct_answer: string,
        difficulty: string,
        incorrect_answers: Array<string>
        question: string,
        type: string
    }]
}
