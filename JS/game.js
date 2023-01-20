const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Vraag 1',
        choice1: '2',
        choice2: '7',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'Vraag 2',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'Vraag 3',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'Vraag 4',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'Vraag 5',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'Vraag 6',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'Vraag 7',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        awsner: 2,
    },
    {
        question: 'Vraag 8',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        awsner: 2,
    },
    {
        question: 'Vraag 9',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        awsner: 2,
    },
    {
        question: 'Vraag 10',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        awsner: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnwsers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnwsers) return

        acceptingAnwsers = false
        const selectedChoice = e.target
        const selectedAnwser = selectedChoice.dataset['number']

        let classToApply = selectedAnwser == currentQuestion.anwser ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        if(!choice) {
            console.log("Choice not found!");
           } else {
            choice.classList.add(classToApply);
           }
        setTimeout(() => {
            selectedChoice.parrentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    });
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()