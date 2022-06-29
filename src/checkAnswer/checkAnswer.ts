import 'animate.css'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { Question } from '../types'
import { renderCategory } from '../renderQuiz'

export const checkAnswer = (question: Question)  => {
    let questionNumber: number = 0
    let scores: number = 0

    const quizQuestion = $('.quiz__question')
    const nextInput = $('.input--next')

    nextInput.css('pointerEvents', 'none')

    $('.question__answer').click(event => {
        const target = event.target
        const text = target.innerText

        nextInput.css('pointerEvents', 'auto')

        const correctAnswer = question.results[questionNumber].correct_answer

        quizQuestion.eq(questionNumber).children('ul').css('pointerEvents', 'none')

        if (correctAnswer.includes(text)) {
            target.classList.add('correct')

            scores++

            return
        }

        target.classList.add('uncorrect')

        setTimeout(() => quizQuestion.eq(questionNumber).children('ul').find(`:contains('${correctAnswer}')`).css('background-color', '#00ce15'), 200)
    })

    nextInput.click(() => {
        questionNumber++

        nextInput.css('pointerEvents', 'none')

        quizQuestion.hide()
        quizQuestion.eq(questionNumber).fadeIn(1000)

        if (quizQuestion.eq(questionNumber).length === 0) {
            Swal.fire({
                title: 'Scores:',
                text: `You answered correctly on ${scores} of 10 question.`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown',
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp',
                },
            })
            $('.quiz__question').remove()

            questionNumber = 0
            scores = 0
            renderCategory()
        }
    })
}
