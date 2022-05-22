const {ipcRenderer} = require("electron")

const onSaveButton = () => {
    const englishInput = document.querySelector("#english-input")
    const russianInput = document.querySelector("#russian-input")
    const word = {
        russian: russianInput.value.trim(),
        english: englishInput.value.trim()
    }
    if (!word["russian"] || !word["english"]) return

    ipcRenderer.send("save::word", word)

    englishInput.value = ""
    russianInput.value = ""
}

const onLoaded = () => {
    const saveButton = document.querySelector("#add-word-button")
    saveButton.addEventListener("click", onSaveButton)
    window.addEventListener("keyup", event => event["code"] === "Enter" ? onSaveButton() : undefined)
}

window.addEventListener('DOMContentLoaded', onLoaded)