const {Trie} = require("../../util/trie")
const {ipcRenderer} = require("electron")

const trie = new Trie()

const clearElem = elem => elem.innerHTML = ""
const buildSuggestionLink = suggestion => `<a href="#!" class="suggestion collection-item">${suggestion}</a>`

const onType = searchInput => event => {
    const wrapperWord = document.querySelector("#wrapper_word")
    if (!wrapperWord.classList.contains("hide")) wrapperWord.classList.add("hide")

    const suggestionsDiv = document.querySelector("#suggestions")
    clearElem(suggestionsDiv)

    const suggestions = []
    trie.findWordsWithPrefix(event.target.value)
        .forEach(suggestion => suggestions.push(buildSuggestionLink(suggestion)))
    suggestionsDiv.innerHTML = suggestions.join("")

    document.querySelectorAll(".suggestion")
        .forEach(a => a.addEventListener("click", e => {
            searchInput.value = e.target.innerHTML
            clearElem(suggestionsDiv)
        }))
}

const sendRequestToFindWordByEnglish = (word) => ipcRenderer
    .send("findWordByEnglish::editpage::main", word)

const onSearch = event => {
    if (event.key !== "Enter") return
    const request = event.target.value.trim()
    sendRequestToFindWordByEnglish(request)
}

const onUpdate = event => {
    const russian = document.querySelector("#russian").value
    const english = document.querySelector("#english").value
    const id = document.querySelector("#id_word").value
    ipcRenderer.send("updateword::editpage::main", {russian, english, id})
}

const onLoaded = () => {
    ipcRenderer.send("search::editpage::main")

    const input = document.querySelector("#search")
    input.addEventListener("input", onType(input))
    input.addEventListener("keyup", onSearch)

    const updateButton = document.querySelector("#update")
    updateButton.addEventListener("click", onUpdate)
}


ipcRenderer.on("search::main::editpage", (event, words) =>
    trie.addAll(words.map(w => w.english.toLowerCase())))

ipcRenderer.on("findWordByEnglish::main::editpage", (event, word) => {
    if (!word) return

    const {id, russian, english} = word

    document.querySelector("#id_word").value = id
    document.querySelector("#english").value = english
    document.querySelector("#russian").value = russian
    document.querySelectorAll("label").forEach( l => l.classList.add("active"))
    document.querySelector("#wrapper_word").classList.remove("hide")
})

window.addEventListener("keyup", event => {
    if (event.key !== "Enter") return
    const searchInput = document.querySelector("#search")
    const wrapperWord = document.querySelector("#wrapper_word")

    const searchInputIsActive = searchInput === document.activeElement
    const wrapperIsHide = wrapperWord.classList.contains("hide")
    const word = searchInput.value.trim()
    if (!searchInputIsActive && wrapperIsHide) sendRequestToFindWordByEnglish(word)
})

window.addEventListener('DOMContentLoaded', onLoaded)