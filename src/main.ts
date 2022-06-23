import $ from 'jquery'
import { renderQuiz } from './renderQuiz'
import './style/style.sass'

const appQuiz = $('<div>', { class: 'app__quiz' }).appendTo($('.app'))

export const quiz = $('<div>', { class: 'quiz' }).appendTo(appQuiz)

$('<h1>', {
    class: 'quiz__title',
    text: 'Quiz App!',
}).appendTo(quiz)

renderQuiz()
