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

const onLoaded = () => {
   const startButton = document.querySelector("#startButton")
   startButton.addEventListener("click", onStartButton)

   ipcRenderer.on("main::page::words::lesson", (event, words) => {
      wordsForLesson = words
      
  })
}

window.addEventListener('DOMContentLoaded', onLoaded)