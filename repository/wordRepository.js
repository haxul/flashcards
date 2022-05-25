const {db} = require("./dbconn")
const moment = require('moment')

const existsWord = async word => new Promise((ok, reject) => {
    db.conn.get("SELECT exists(SELECT * FROM word WHERE english = ?) as 'exists'", [word], (err, row) => {
        const {exists} = row
        if (exists === 1) {
            console.log(`cannot save: word "${word}" exists`)
            ok(true)
            return
        }
        ok(false)
    })
})

const saveWordPersistant = async (word) => {
    const {english, russian} = word
    const timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    const exists = await existsWord(english)
    if (exists) return
    const params = [english, russian, 1000, timestamp]
    db.conn.run("INSERT INTO word(english, russian, priority, last_updated) VALUES(?,?,?,?)", params)
}

const fetchWordsPriorityOrder = fn => {
    db.conn.all("SELECT * FROM word", (err, rows) => {
        if (err) throw new Error("cannot select words")
        console.log(`fetched ${rows.length} words from the database`)
        fn(rows)
    })
}

module.exports = {
    saveWordPersistant,
    fetchWordsPriorityOrder
}