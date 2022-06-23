import 'animate.css'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { renderCategory } from '../renderQuiz'
import { Question } from '../types'

export const checkAnswer = (results: Question['results']) => {
    let questionNumber: number = 0
    let Scores: number = 0

    const quizQuestion = $('.quiz__question')
    const nextInput = $('.input--next')

    nextInput.css('pointerEvents', 'none')

    $('.question__answer').click(event => {
        const target = event.target
        const text = target.innerText

        nextInput.css('pointerEvents', 'auto')

        const correctAnswer = results[questionNumber].correct_answer

        quizQuestion.eq(questionNumber).children('ul').css('pointerEvents', 'none')

        if (correctAnswer.includes(text)) {
            target.classList.add('correct')

            Scores++

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
                text: `You answered correctly on ${Scores} of 10 question.`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown',
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp',
                },
            })
            $('.quiz__question').remove()

            questionNumber = 0
            Scores = 0
            renderCategory()
        }
    })
}
