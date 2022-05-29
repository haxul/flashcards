const {
    saveWordPersistant,
    fetchWordsPriorityOrder,
    findByEnglish,
    updateWord
} = require("../repository/wordRepository")


const saveWordHandler = (fn, event, word) => (event, word) => fn(word)
const saveWordPersistHandler = saveWordHandler(saveWordPersistant)

const startLessonHandler = (frame, channel, event) =>
    event => fetchWordsPriorityOrder(fetchedWords =>
        frame.window.webContents.send(channel, fetchedWords))

const findWordByEnglish = ({frame, channel, word}) =>
    findByEnglish(word).then(data => frame.window.webContents.send(channel, data))

const updateWordHandler = (frame, e, data) => (e, data) => {
    updateWord(data)
    frame.window.close()
}

module.exports = {
    saveWordPersistHandler,
    startLessonHandler,
    findWordByEnglish,
    updateWordHandler
}