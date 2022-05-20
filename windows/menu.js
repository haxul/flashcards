const buildMainMenu = (config) => {
    const { addWordFrame, mainFrame } = config
    return [
        {
            label: "File",
            submenu: [
                {
                    label: "Add word",
                    accelerator: "Ctrl+W",
                    click() { addWordFrame.initWindow({ top: mainFrame.window }) }
                }
            ]
        }
    ]
}

module.exports = { buildMainMenu }