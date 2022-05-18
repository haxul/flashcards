const { BrowserWindow } = require("electron")
const path = require('path')


class MainFrame {

    window = null

    initWindow(config) {
        
        const { onClose } = config

        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        this.window.loadFile(path.join(__dirname, "index.html"))
        this.window.on("closed", onClose)
    }
}


const mainWindow = new MainFrame()

module.exports = { mainWindow }

