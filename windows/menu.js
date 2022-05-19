const buildMainMenu = (config) => {
    const { addWordFrame, onQuit } = config
    return [
        {
            label: "File",
            submenu: [
                {
                    label: "Add item",
                    click() { addWordFrame.initWindow() }
                },
                {
                    label: "Quit",
                    accelerator: "Ctrl+Q",
                    click() { onQuit() }
                }
            ]
        }
    ]
}

module.exports = { buildMainMenu }