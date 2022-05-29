const {app, Menu, ipcMain} = require("electron")
const {mainFrame} = require("./windows/main")
const {addWordFrame} = require("./windows/addWord")
const {editFrame} = require("./windows/edit")
const {buildMainMenu} = require("./windows/menu")
const {db} = require("./repository/dbconn")
const {
    saveWordPersistHandler,
    startLessonHandler,
    findWordByEnglish,
    updateWordHandler
} = require("./service/wordService")


app.whenReady().then(() => {
    mainFrame.initWindow({onClose: app.quit})

    // configure main Menu
    const menuConfig = {addWordFrame, mainFrame, editFrame}

    if (process.env.NODE_ENV === "dev") menuConfig["devMode"] = true

    const menuTemplate = buildMainMenu(menuConfig)

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    // conn database
    db.connect()
})

//save word
ipcMain.on("save::word", saveWordPersistHandler)
// start lesson
ipcMain.on("start::lesson", startLessonHandler(mainFrame, "main::page::words::lesson"))
// search and editing
ipcMain.on("search::editpage::main", startLessonHandler(editFrame, "search::main::editpage"))

ipcMain.on("updateword::editpage::main", updateWordHandler(editFrame))

ipcMain.on("findWordByEnglish::editpage::main", (e, englishWord) => findWordByEnglish({
        frame: editFrame, word: englishWord, channel: "findWordByEnglish::main::editpage"
    })
)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})