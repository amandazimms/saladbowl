let words = []
let currentWords = []
let roundId = 1

let activeTeam = 1

let team1Points = 0
let team2Points = 0

const wordInput = document.getElementById('wordInput')
const phase1 = document.getElementById('phase1')
const phase2 = document.getElementById('phase2')
const addPointButton = document.getElementById('addPointButton')
const team1PointsText = document.getElementById('team1Points')
const team2PointsText = document.getElementById('team2Points')
const activeIndicator1 = document.getElementById('activeIndicator1')
const activeIndicator2 = document.getElementById('activeIndicator2')
const startTurnButton = document.getElementById('startTurn')
const endTurnButton = document.getElementById('endTurn')
const startRoundButton = document.getElementById('startNextRound')
const secretWord = document.getElementById('secretWord')
const secretWordDiv = document.getElementById('secretWordDiv')
const roundTitle = document.getElementById('roundTitleText')
const roundDescription = document.getElementById('roundDescriptionText')
const gotLastWord = document.getElementById('gotLastWord')
const timerText = document.getElementById('timerText')
const endGame = document.getElementById('end')
const winnerText = document.getElementById('winnerText')
let maxTime = 60
let timer = null
let graceTimer = null
const bell = new Audio('bell.mp3');



const nextWord = () => {
    let word = wordInput.value;
    words.push(word)
    wordInput.value = ""

    console.log("words:", words)
}

const doneButton = () => {
    wordInput.value = ""
    phase1.style.display = "none"
    phase2.style.display = "inline"

    currentWords = [...words]
}

const startNextRound = () => {
    roundId++
    gotLastWord.style.display = "none"

    if (roundId == 2) {
        roundTitle.innerHTML = "Round Two:"
        roundDescription.innerHTML = "Charade Style"
    } else if (roundId == 3) {
        roundTitle.innerHTML = "Round Three:"
        roundDescription.innerHTML = "Single Word Style"
    } else if (roundId == 4) {
        roundTitle.innerHTML = "Round Four:"
        roundDescription.innerHTML = "Blanket Style"
    } 
    else {
        console.log('error - unknown round id?')
    }

    currentWords = [...words]
    startRoundButton.style.display = "none"
    startTurnButton.style.display = "inline"
}

const startTurn = () => {
    gotLastWord.style.display = "none"
    addPointButton.style.display = "inline"
    startTimer()
    getNewWord()
}

const getNewWord = () => {
    if (currentWords.length > 0) {
        const rand = Math.floor(Math.random() * currentWords.length)
        const ourWord = currentWords.splice(rand, 1)
        
        secretWord.innerHTML = ourWord
        secretWordDiv.style.display = "inline"
        addPointButton.style.display = "inline"
        startTurnButton.style.display = "none"
    } 
    else {
        addPointButton.style.display = "none"
        gotLastWord.style.display = "inline"
        endOfTimer()
        clearInterval(timer);
    }
}

const switchTeam = () => {
    console.log('switching team')
    if (activeTeam == 1) {
        activeTeam = 2
        activeIndicator2.style.visibility = "visible"
        activeIndicator2.style.color = "green"
        activeIndicator1.style.visibility = "hidden"
        activeIndicator1.style.color = "red"
    } else if (activeTeam == 2) {
        activeTeam = 1
        activeIndicator1.style.visibility = "visible"
        activeIndicator1.style.color = "green"
        activeIndicator2.style.visibility = "hidden"
        activeIndicator2.style.color = "red"
    } else {
        console.log('error - unsure which team is active and could not switch teams')
    }
    console.log('team switched to: ', activeTeam)

}

const startTimer = () => { 
    let countdown = maxTime
    timerText.innerHTML = countdown 
    timerText.style.display = "inline"

    clearInterval(timer);
    timer = setInterval( () => { 
        if (countdown > 0){
            countdown--;
            timerText.innerHTML = countdown 
        } else {
            endOfTimer()
            clearInterval(timer);
        }
    }, 1000); //(ms) - runs every 1 second
}

const endOfTimer = () => {
    bell.loop = false;
    bell.play();

    let graceCountdown = 1
    clearInterval(graceTimer);
    graceTimer = setInterval( () => { 
        if (graceCountdown > 0){
            graceCountdown--;
        } else {
            endTurnButton.style.display = "inline"
            timerText.style.display = "none"
            addPointButton.style.display = "none"
            clearInterval(graceTimer);
        }
    }, 1000); //(ms) - runs every 1 second   
}

const endTurn = () => {
    switchTeam()

    secretWordDiv.style.display= "none"
    endTurnButton.style.display = "none"
    gotLastWord.style.display = "none"

    if (currentWords.length > 0) {
        startTurnButton.style.display = "inline"
    }

    else {
        addPointButton.style.display = "none"

        if (roundId == 4) {
            startRoundButton.style.display = "none"
            endGame.style.display = "inline"
            if (team1Points > team2Points) {
                winnerText.innerHTML = "Game over - Team 1 Wins!"
            } else if (team1Points < team2Points) {
                winnerText.innerHTML = "Game over - Team 2 Wins!"
            } else {
                winnerText.innerHTML = "Game over - It's a Tie!"
            }
        }
        else {
            startRoundButton.style.display = "inline"
        }
    }
}

const addPoint = () => {
    if (activeTeam == 1) {
        team1Points++
        team1PointsText.innerHTML = "Team 1 Score: " + team1Points
        getNewWord()
    }
    else if (activeTeam == 2) {
        team2Points++
        team2PointsText.innerHTML = "Team 2 Score: " + team2Points
        getNewWord()
    }
    else {
        console.log("error - unsure which team is active and could not add point")
    }
}