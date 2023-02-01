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
        question: 'Wat is HEADSHOT-damage percentage als je van een wapen schiet ongeveer in CS:GO?',
        choice1: '20%',
        choice2: '330%',
        choice3: '360%',
        choice4: '400%',
        answer: 4,
    },
    {
        question: 'Wat is de release-datum van CS:GO?',
        choice1: '1 juli 2011',
        choice2: '21 augustus 2012',
        choice3: '19 november 2016',
        choice4: '12 december 2012',
        answer: 2,
    },
    {
        question: 'Wat is de minimale vereiste CPU om CS:GO te draaien',
        choice1: 'Intel Core2 Duo E6600',
        choice2: 'AMD Ryzen 5',
        choice3: 'Intel Core i3-4340',
        choice4: 'AMD Phenom II X2 545',
        answer: 2,
    },
    {
        question: 'Welke wapenfamilie heeft een meest effectief bereik?',
        choice1: 'Pistolen',
        choice2: 'SMG',
        choice3: 'Assualt Rifles',
        choice4: 'Shotguns',
        answer: 3,
    },
    {
        question: 'Wat is de official game-mode in CSGO',
        choice1: 'Casual',
        choice2: 'Competitive',
        choice3: 'Wingman',
        choice4: 'Deathmatch',
        answer: 2,
    },
    {
        question: 'Wat is de minimale vereiste RAM om CS:GO te draaien',
        choice1: '4GB',
        choice2: '8GB',
        choice3: '16GB',
        choice4: '32GB',
        answer: 2,
    },
    {
        question: 'Wat voor spellen kunnen gespeeld worden in CS:GO?',
        choice1: 'Deathmatch',
        choice2: 'Danger Zone',
        choice3: 'Arms Race',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'Wat is de naam van het startmenu in CS:GO?',
        choice1: 'Main Menu',
        choice2: 'Home Menu',
        choice3: 'Launch Screen',
        choice4: 'Front Page',
        answer: 1,
    },
    {
        question: 'Welke van de volgende opties is bestand aan Valve Anti-cheat?',
        choice1: 'Mac OS',
        choice2: 'Linux',
        choice3: 'Windows',
        choice4: 'Android',
        answer: 3,
    },
    {
        question: 'Welke anti-cheat heeft CS:Go geïmplementeerd?',
        choice1: 'Easy-Anti-Cheat',
        choice2: 'Gameguard',
        choice3: 'PunkBuster',
        choice4: 'Valve Anti-Cheat',
        answer: 4,
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

        return window.location.assign('./end1.html')
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