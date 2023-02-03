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
        question: 'In welke jaar is Fortnite Battle Royale gelanceerd?',
        choice1: '2015',
        choice2: '2017',
        choice3: '2018',
        choice4: '2016',
        answer: 2,
    },
    {
        question: 'Hoeveel spelers kunnen samen spelen in een normale Battle Royale match?',
        choice1: '4',
        choice2: '2',
        choice3: '50',
        choice4: '6',
        answer: 1,
    },
    {
        question: 'Wat is het doel van een Battle Royale match in Fortnite?',
        choice1: 'Bouwen van de grootste structuur',
        choice2: 'Het verzamelen van de meeste voorraden',
        choice3: 'Het elimineren van alle andere spelers',
        choice4: 'Het overleven van een aanvalsgolf van monsters',
        answer: 3,
    },
    {
        question: 'Met welk type wapen zou je in een kogel iemand kunnen uitschakkelen',
        choice1: 'Assault rifle',
        choice2: 'Rocket Launcher',
        choice3: 'Blauwe pump',
        choice4: 'Sniper Rifle',
        answer: 4,
    },
    {
        question: 'Welk hoofdstuk/chapter is Fortnite nu in',
        choice1: '4',
        choice2: '5',
        choice3: '3',
        choice4: '2',
        answer: 1,
    },
    {
        question: 'Hoe heet de paarse circle waar speler niet in moeten komen en deze steeds kleiner wordt',
        choice1: 'De Rift',
        choice2: 'De Storm',
        choice3: 'De Circle',
        choice4: 'De Vortex',
        answer: 2,
    },
    {
        question: 'Wat is de naam van het systeem waarmee spelers materialen kunnen verzamelen en gebouwen kunnen maken in Fortnite Battle Royale',
        choice1: 'Harvesting',
        choice2: 'Pickaxing',
        choice3: 'Building',
        choice4: 'Gathering',
        answer: 1,
    },
    {
        question: 'Hoeveel verschillende soorten materialen zijn er beschikbaar om te verzamelen en te gebruiken voor het bouwen in Fortnite Battle Royale',
        choice1: '5',
        choice2: '3',
        choice3: '4',
        choice4: '27',
        answer: 2,
    },
    {
        question: 'In een competitief potje, wat is het maximale aan materialen (bijv: hout) dat je kan hebben',
        choice1: '1000',
        choice2: '499',
        choice3: '999',
        choice4: '500',
        answer: 4,
    },
    {
        question: 'Wat was de naam van de professionele Fortnite speler die in 2019 de Solo World cup had gewonnen',
        choice1: 'Ninja',
        choice2: 'Aqua',
        choice3: 'Bugha',
        choice4: 'vJab0b',
        answer: 3,
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

        return window.location.assign('./end.html')
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