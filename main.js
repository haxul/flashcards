const { app, Menu } = require("electron")
const { mainFrame } = require("./windows/main")
const { addWordFrame } = require("./windows/addWord")
const { buildMainMenu } = require("./windows/menu")

app.whenReady().then(() => {
    mainFrame.initWindow({ onClose: app.quit })

    // configure main Menu
    const menuTemplate = buildMainMenu({
        addWordFrame,
        onQuit: app.quit
    })
    
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
                }
            ]
        })
    }

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})