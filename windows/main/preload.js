const { ipcRenderer } = require("electron")

let wordsForLesson = []
// handler on start button
const onStartButton = () => {
   const startContainer = document.querySelector("#start-container")
   const box = document.querySelector("#box-working")
   startContainer.style.display = "none"
   box.style.display = "block"
   ipcRenderer.send("start::lesson")
}

const teachWord = () => {
   const frontH6 = document.querySelector("#front-side")
   const backH6 = document.querySelector("#back-side")

   if (wordsForLesson.length === 0) {
      alert("the lesson is done")
      frontH6.innerHTML = "Спасибо"
      backH6.innerHTML = "Thanks"
      return
   }

   const { russian, english } = wordsForLesson.pop()
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
   repeatButton.addEventListener("click", (e) => teachWord())

   // events handlers 
   ipcRenderer.on("main::page::words::lesson", (event, words) => {
      wordsForLesson = words
      teachWord()
   })
}



window.addEventListener('DOMContentLoaded', onLoaded)