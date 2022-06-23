import $, { error } from 'jquery'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { quiz } from '../'
import { selectedCategory } from '../selectedCategory'
import { Categories } from '../types'

const APICATEGORY = 'https://opentdb.com/api_category.php'

export const renderCategory = () => {
    $('.quiz').removeClass('questions')

    const textCategory = $('<h2>', {
        class: 'quiz--text',
        text: 'Select Category:',
    })
        .appendTo(quiz)
        .hide()

    const spinner = $('<img>', {
        class: 'quiz--spinner',
        src: '/src/img/Spinner-1s-200px.gif',
    }).appendTo(quiz)

    const quizCategory = $('<div>', { class: 'quiz__category' }).appendTo(quiz)
    const category = $('<div>', { class: 'category' }).appendTo(quizCategory)

     fetch(APICATEGORY)
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            throw error
        })
        .then(categoryList => {
            const { trivia_categories } = categoryList

            trivia_categories
                .filter((categories: Categories) => categories.id === 9 || (categories.id > 20 && categories.id < 29))
                .forEach((categories: Categories) => {
                    textCategory.show()

                    $('<div>', {
                        class: 'category__list',
                        id: categories.id,
                        text: categories.name,
                    })
                        .appendTo(category)
                        .hide()
                        .slideDown(1000)
                })

            selectedCategory()
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: error,
            }).then(() => window.location.reload())
        })
        .finally(() => spinner.hide())
}

export const renderQuiz = () => {
    const text = $('<h2>', {
        class: 'quiz--text',
        text: 'Hello!',
    })
        .appendTo(quiz)
        .hide()

    text.fadeIn(1000)

    const button = $('<button>', {
        class: 'input--button',
        text: 'Start',
    }).appendTo(quiz)

    button.click(() => {
        renderCategory()
        text.remove()
        button.remove()
    })
}
