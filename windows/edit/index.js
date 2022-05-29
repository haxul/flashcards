const { BrowserWindow } = require("electron")
const path = require("path")

class EditFrame {
    window = null

    initWindow(config) {
        const { top } = config
        this.window = new BrowserWindow({
            width: 600,
            height: 800,
            maxWidth: 600,
            maxHeight: 800,
            parent: top,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })

        this.window.loadFile(path.join(__dirname, "index.html"))
    }
}

module.exports = {editFrame: new EditFrame()}