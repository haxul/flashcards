const { app } = require("electron")
const { mainFrame } = require("./windows/main")

app.whenReady().then(() => {
    mainFrame.initWindow({
        onClose: app.quit
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})