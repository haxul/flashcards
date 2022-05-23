const {ipcRenderer} = require("electron")
const {shuffle} = require("../../util/shuffle")

// words for lesson. Downloads earch time after start button click
let wordsForLesson = [] // TODO переделать на двусвязный список

// handler on start button
const onStartButton = () => {
    const startContainer = document.querySelector("#start-container")
    const box = document.querySelector("#box-working")
    startContainer.style.display = "none"
    box.style.display = "block"
    ipcRenderer.send("start::lesson")
}

const teachWord = (fnObject = {exec: () => {}, params: []}) => {
    fnObject["exec"](...fnObject["params"])

    const frontH6 = document.querySelector("#front-side")
    const backH6 = document.querySelector("#back-side")

    if (wordsForLesson.length === 0) {
        alert("the lesson is done")
        frontH6.innerHTML = "Спасибо"
        backH6.innerHTML = "Thanks"
        return
    }

    const {russian, english} = wordsForLesson.pop()
    frontH6.innerHTML = russian
    backH6.innerHTML = english
}

const onLoaded = () => {

    // start button
    const startButton = document.querySelector("#startButton")
    startButton.addEventListener("click", onStartButton)

    // correctButton
    const correctButton = document.querySelector("#correct")
    const repeatButton = document.querySelector("#repeat")

    correctButton.addEventListener("click", (e) => teachWord())

    repeatButton.addEventListener("click", (e) => teachWord({
        exec: (english, russian) => wordsForLesson.unshift({english, russian}),
        params: [document.querySelector("#back-side").innerHTML, document.querySelector("#front-side").innerHTML]
    }))

    // events handlers
    ipcRenderer.on("main::page::words::lesson", (event, words) => {
        wordsForLesson = words
        shuffle(wordsForLesson)
        teachWord()
    })
}


window.addEventListener('DOMContentLoaded', onLoaded)