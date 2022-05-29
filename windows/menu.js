const buildMainMenu = (config) => {
    const { addWordFrame, mainFrame, devMode, editFrame } = config
    const menuTemplate = [
        {
            label: "File",
            submenu: [
                {
                    label: "Add word",
                    accelerator: "Ctrl+W",
                    click() { addWordFrame.initWindow({ top: mainFrame.window }) }
                },
                {
                    label: "Edit word",
                    accelerator: "Ctrl+E",
                    click() { editFrame.initWindow({ top: mainFrame.window }) }
                }
            ]
        },

    ]

    if (devMode) {
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

    return menuTemplate
}

module.exports = { buildMainMenu }