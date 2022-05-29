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

const findByEnglish = word => new Promise((ok, reject) => {
    db.conn.get("SELECT * FROM word WHERE  lower(english) = ?", [word], (err, row) => ok(row))
})

const fetchWordsPriorityOrder = fn => {
    db.conn.all("SELECT * FROM word ORDER BY random() LIMIT 50", (err, rows) => {
        if (err) throw new Error("cannot select words")
        fn(rows)
    })
}

const updateWord = ({russian, english, id}) => {
    db.conn.run("UPDATE word SET english= ?, russian = ? WHERE id= ?", [english, russian, id])
}

module.exports = {
    saveWordPersistant,
    fetchWordsPriorityOrder,
    findByEnglish,
    updateWord
}