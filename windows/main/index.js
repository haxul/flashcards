const { BrowserWindow } = require("electron")
const path = require('path')

class MainFrame {

    window = null

    initWindow(config) {

        const { onClose } = config

        this.window = new BrowserWindow({
            maxHeight: 600,
            maxWidth: 800,
            width: 800,
            height: 600,
            fullscreenable: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        this.window.loadFile(path.join(__dirname, "index.html"))
        this.window.on("closed", onClose)
    }
}

module.exports = { mainFrame: new MainFrame() }