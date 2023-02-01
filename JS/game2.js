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
        question: 'In welk jaar werd Minecraft volledig uitgebracht?',
        choice1: '2011',
        choice2: '2015',
        choice3: '2009',
        choice4: '2012',
        answer: 1,
    },
    {
        question: 'Minecraft is gebruikt in educatieve omgevingen om informatica, computerondersteund ontwerp en welk ander onderwerp te onderwijzen?',
        choice1: 'Wiskunde',
        choice2: 'Scheikunde',
        choice3: 'Engels',
        choice4: 'Geschiedenis',
        answer: 2,
    },
    {
        question: 'Hoeveel spelers kunnen tegelijkertijd samen spelen in Minecraft Realms?',
        choice1: '8',
        choice2: '5',
        choice3: '10',
        choice4: '1',
        answer: 3,
    },
    {
        question: 'welk item heb je nodig om alle drankjes te maken?',
        choice1: 'Gunpowder',
        choice2: 'Vuur',
        choice3: 'Ketel',
        choice4: 'Water flesje',
        answer: 4,
    },
    {
        question: 'Het spel volgt een dag- en nachtcyclus. Hoe lang duurt een volledige cyclus in realtime?',
        choice1: '20 minuten',
        choice2: '10 minuten',
        choice3: '40 minuten',
        choice4: '30 minuten',
        answer: 1,
    },
    {
        question: 'Hoe heette het spel aanvankelijk?',
        choice1: 'Minecraft Earth',
        choice2: 'Cave game',
        choice3: 'Craft mine',
        choice4: 'Life craft',
        answer: 2,
    },
    {
        question: 'Welke soort is ontstaan door een codeerfout?',
        choice1: 'Zombie',
        choice2: 'Villager',
        choice3: 'Creeper',
        choice4: 'Blaze',
        answer: 3,
    },
    {
        question: 'Wat is doodsbang voor Ocelots?',
        choice1: 'Heksen',
        choice2: 'Chicken jockey',
        choice3: 'Vex',
        choice4: 'Creepers',
        answer: 4,
    },
    {
        question: 'Welk item kan sugar cane maken?',
        choice1: 'Paper',
        choice2: 'Cake',
        choice3: 'Boek',
        choice4: 'Map',
        answer: 1,
    },
    {
        question: 'Axolotl can come in how many different colors?',
        choice1: '6',
        choice2: '5',
        choice3: '4',
        choice4: '8',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end2.html')
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

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
         'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()