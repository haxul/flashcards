const { BrowserWindow } = require("electron")
const path = require("path")

class AddWordFrame {
    window = null

    initWindow(config) {
        const { top } = config
        this.window = new BrowserWindow({
            width: 600,
            height: 350,
            maxWidth: 600,
            maxHeight: 350,
            parent: top,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })

        this.window.loadFile(path.join(__dirname, "index.html"))
    }
}

module.exports = { addWordFrame: new AddWordFrame() }