const { app, Menu, ipcMain } = require("electron")
const { mainFrame } = require("./windows/main")
const { addWordFrame } = require("./windows/addWord")
const { buildMainMenu } = require("./windows/menu")
const { db } = require("./repository/dbconn")
const { saveWordPersistHandler, startLessonHandler } = require("./service/wordService")

app.whenReady().then(() => {
    mainFrame.initWindow({ onClose: app.quit })

    // configure main Menu
    const menuTemplate = buildMainMenu({ addWordFrame, mainFrame })

    if (process.env.NODE_ENV !== "prod") {
        menuTemplate.push({

            label: "Developer Tools",
            submenu: [
                {
                    label: "Toggle DevTools",
                    accelerator: "F12",
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                },
                {
                    role: "reload"
                },
            ]
        })
    }

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    // conn database
    db.connect()
})

//save word
ipcMain.on("save::word", saveWordPersistHandler)
// start lesson
ipcMain.on("start::lesson", startLessonHandler(mainFrame))

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})