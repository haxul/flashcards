
const { ipcRenderer } = require("electron")

const onSaveButton = (e) => {
    const englishInput = document.querySelector("#english-input")
    const russianInput = document.querySelector("#russian-input")
    const word = {
        russian: russianInput.value,
        english: englishInput.value
    }

    ipcRenderer.send("save::word", word)
    
    englishInput.value = ""
    russianInput.value = ""
}

const onLoaded = () => {
    const saveButton = document.querySelector("#add-word-button")
    saveButton.addEventListener("click", onSaveButton)
}

window.addEventListener('DOMContentLoaded', onLoaded)