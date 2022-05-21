const { saveWordPersistant, fetchWordsPriorityOrder } = require("../repository/wordRepository")


const saveWordHandler = (persistWordFn, event, word) => (event, word) => persistWordFn(word)
const saveWordPersistHandler = saveWordHandler(saveWordPersistant)

const startLessonHandler = (frame, event) =>
    event => fetchWordsPriorityOrder(fetchedWords => frame.window.webContents.send("main::page::words::lesson", fetchedWords))


module.exports = {
    saveWordPersistHandler,
    startLessonHandler
}