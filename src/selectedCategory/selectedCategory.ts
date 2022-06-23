import $ from 'jquery'
import { quiz } from '..'
import { Difficulty } from '../types'
import { selectedDifficulty } from './selectedDifficulty'

export const selectedCategory = () => {
    $('.category__list').click(event => {
        $('.quiz--alert').remove()

        const target = event.target
        const quizDifficult = $('<div>', { class: 'quiz__difficulty' }).appendTo(quiz)

        const difficultEasy = $('<div>', {
            class: 'difficulty',
            name: 'easy',
            categoryId: target.id,
            text: Difficulty.Easy,
        })
            .appendTo(quizDifficult)
            .hide()

        const difficultMedium = $('<div>', {
            class: 'difficulty',
            name: 'medium',
            categoryId: target.id,
            text: Difficulty.Medium,
        })
            .appendTo(quizDifficult)
            .hide()

        const difficultHard = $('<div>', {
            class: 'difficulty',
            name: 'hard',
            categoryId: target.id,
            text: Difficulty.Hard,
        })
            .appendTo(quizDifficult)
            .hide()

        const textQuiz = $('.quiz--text')

        $('.category').remove()
        $('.quiz__category').remove()

        textQuiz.hide()
        textQuiz.text($(target).text())
        textQuiz.fadeIn(1000)

        setTimeout(() => textQuiz.addClass('slide'), 1000)

        setTimeout(() => {
            textQuiz.removeClass('slide')

            difficultEasy.fadeIn(500)
            difficultMedium.fadeIn(500)
            difficultHard.fadeIn(500)
        }, 2000)

        selectedDifficulty()
    })
}
