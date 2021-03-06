var currentQuestionIndex = 0;
var timeCount = document.querySelector(".time-count");
// var highScore = document.querySelector(".high-score-leftside");
var gameStart = document.querySelector('#startbtn');
var mainBox = document.querySelector('.main-box');
var showQues = document.querySelector('#question-container');
// var questionElement = document.querySelector('#question-text');
var selAnswer = document.querySelector('.answer-buttons');
var timeElement = document.querySelector('.time-count')
var timeLeft = 75;
var time;
var timeCount;
var quizCompleted = document.querySelector('#finish-screen');
var answerEl = document.querySelector('.btn');
var result = document.querySelector('#result');
var finalScore = document.querySelector('#final-score');

//set time running form 75
function startTime() {
    timeInterval = setInterval(function () {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (!timeLeft > 0) {
            timeLeft = 0;
        }
        timeCount.textContent = timeLeft.toString().padStart(2, "0");
        checkTimeRemaining();
    }, 1000);
}
//check if time equal 0 the the time count will stop
function checkTimeRemaining() {
    if (timeLeft <= 0) {
        clearInterval(timeInterval);
        showFinalScore(); //run final score function
    }
}
//set the finish screen pop up when the quiz is done or timeCount=0
function showFinalScore() {
    //console.log(timeLeft);
    showQues.setAttribute('class', 'hide');
    quizCompleted.removeAttribute('class')
    //console.log('question completed')
    finalScore.textContent = timeLeft;
    // localStorage.setItem('time', timeLeft);
}
//start the game
function startGame() {
    console.log('you start the game')
    //hide the main box
    mainBox.setAttribute('class', 'hide');
    //unhide the question container
    showQues.removeAttribute('class');
    showQuestion(0);
    //start time
    startTime();
}
// event happen when the start button click
gameStart.addEventListener('click', startGame)

function showQuestion(index) {
    const que_text = document.querySelector('#question-text');
    let que_tag = '<h2>' + questions[index].question + '</h2>';
    let answer_tag = '<button class="btn" id="answer0">' + questions[index].choices[0] + '</button>'
        + '<button class="btn" id="answer1">' + questions[index].choices[1] + '</button>'
        + '<button class="btn" id="answer2">' + questions[index].choices[2] + '</button>'
        + '<button class="btn" id="answer3">' + questions[index].choices[3] + '</button>';

    que_text.innerHTML = que_tag;
    selAnswer.innerHTML = answer_tag;
}
selAnswer.addEventListener('click', choiceSelected)
//if user select the answer
//$("#result").delay(3200).hide(0);

function choiceSelected(event) {
    //console.log(event.target.textContent);
    if (event.target.textContent !== questions[currentQuestionIndex].correct) {
        timeLeft -= 15;
        result.textContent = 'Wrong';
        setTimeout(function () {
            result.textContent = '';
        }, 1000);
    } else {
        result.textContent = 'Correct';
        setTimeout(function () {
            result.textContent = '';
        }, 1000);
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        clearInterval(timeInterval);
        showFinalScore();
    }
    checkTimeRemaining()
}
var questions = [
    {
        question: 'What does HTML stand for?',
        choices: ['Hypper Text Preprocessor', 'Hyper Text Markup Language', 'Hyper Text Multiple Language', 'Hyper Tool Multi Language'],
        correct: 'Hyper Text Markup Language'
    },
    {
        question: 'Commonly ued data types DO NOT include:',
        choices: ['strings', 'boolean', 'alerts', 'numbers'],
        correct: 'alerts'
    },
    {
        question: 'The condition in an if/else statement is enclosed within _____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        correct: 'parentheses'
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        choices: ['numbers and strings ', 'other arrays ', 'booleans', 'all of the above '],
        correct: 'all of the above '
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminalbash', 'for loops', 'console.log'],
        correct: 'console.log',
    }
]
//saving the score
var nameEl = document.querySelector('#user-name')
var submitScore = document.querySelector('#submit');
function saveProgress(event) {
    // console.log('saved')
    event.preventDefault();
    var score = timeLeft;
    var userName = nameEl.value.trim();
    //save name and score to local storage
    if (userName !== "") {
        var viewScore = JSON.parse(localStorage.getItem('highscores')) || [];
        var newScore = {
            initials: userName,
            userScore: score,
        }
        viewScore.push(newScore); //add newScore to localStore 
        //convert viewScore object into an JSON string with highscores key to be store in localStorage
        window.localStorage.setItem('highscores', JSON.stringify(viewScore));
    } else {
        alert('You need to type your initials to save your score')
    }
}
submitScore.addEventListener('click', saveProgress);
