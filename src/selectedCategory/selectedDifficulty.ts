import he from 'he'
import $, { error } from 'jquery'
import Swal from 'sweetalert2'
import { quiz } from '../'
import { checkAnswer } from '../checkAnswer'
import { renderCategory } from '../renderQuiz'
import { Question } from '../types'

export const selectedDifficulty = () => {
    $('.difficulty').click(event => {
        const quizDifficulty = $('.quiz__difficulty')
        const quizText = $('.quiz--text')
        const target = event.target
        const categoryID = $(target).attr('categoryid')
        const difficultName = $(target).attr('name')

        quizDifficulty.slideUp(1000)
        quizText.slideUp(200)

        setTimeout(() => $('.quiz--spinner').show(), 1000)

        quizDifficulty.remove()
        quizText.remove()
        $('.quiz').addClass('questions')

        const APIQUESTIONS = `https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=${difficultName}&type=multiple`

        setTimeout(() => {
            fetch(APIQUESTIONS)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }

                    throw error
                })
                .then((question: Question) => {
                    const { response_code, results } = question

                    if (response_code === 0) {
                        results.forEach(questions => {
                            const answer = questions.incorrect_answers.concat(questions.correct_answer)

                            const quizQuestion = $('<div>', { class: 'quiz__question' }).appendTo(quiz).hide()

                            const questionTitle = $('<div>', { class: 'question__title' }).appendTo(quizQuestion)

                            $('<p>', {
                                class: 'title--text',
                                text: he.decode(questions.question),
                            }).appendTo(questionTitle)

                            const question = $('<ul>', { class: 'question' }).appendTo(quizQuestion)

                            const sortRandom = answer.sort(() => Math.random() - 0.5)

                            sortRandom.forEach(answer => {
                                $('<li>', {
                                    class: 'question__answer',
                                    text: he.decode(answer),
                                }).appendTo(question)
                            })
                        })

                        $('.quiz__question').eq(0).fadeIn(1000)

                        $('<button>', {
                            class: 'input--next',
                            text: 'NEXT',
                        }).appendTo($('.quiz__question'))

                        checkAnswer(results)
                    }

                    if (response_code === 1) {
                        $('<div>', {
                            class: 'quiz--alert',
                            text: `We don't have a question, sorry! Please selected another difficulty or category!`,
                        }).appendTo(quiz)

                        quizDifficulty.remove()
                        quizText.remove()
                        $('.quiz').removeClass('.questions')

                        renderCategory()
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: error,
                    }).then(() => renderCategory())
                })
                .finally(() => $('.quiz--spinner').remove())
        }, 1000)
    })
}
