const buildMainMenu = (config) => {
    const { onAddWord } = config
    return [
        {
            label: "File",
            submenu: [
                {
                    label: "Add word",
                    accelerator: "Ctrl+W",
                    click() { onAddWord() }
                }
            ]
        }
    ]
}

module.exports = { buildMainMenu }