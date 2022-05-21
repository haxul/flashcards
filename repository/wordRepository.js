const { db } = require("./dbconn")
const moment = require('moment')
 

const saveWordPersistant = (word) => {
    const { english, russian } = word
    const timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    
    db.conn.run("INSERT INTO word(english, russian, priority, last_updated) VALUES(?,?,?,?)",
        [english, russian, 1000, timestamp]
    )
}

const fetchWordsPriorityOrder = fn => {
    const words = []
    db.conn.all("SELECT * FROM word ORDER BY priority LIMIT 100", (err, rows) => {
        if (err) throw new Error("cannot select words")
        rows.forEach(row => words.push(row))
        fn(words)
    })
}

module.exports = {
    saveWordPersistant,
    fetchWordsPriorityOrder
}