const { app } = require("electron")
const { mainWindow } = require("./windows/main")

app.whenReady().then(() => {
    mainWindow.initWindow({
        onClose: app.quit
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})