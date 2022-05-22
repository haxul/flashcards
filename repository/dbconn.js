const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const os = require('os')


const wordTableSql = `
CREATE TABLE IF NOT EXISTS word (
    id integer PRIMARY KEY AUTOINCREMENT,
    english varchar(500) NOT NULL,
    russian varchar(500) NOT NULL,
    priority int NOT NULL,
    last_updated timestamp NOT NULL
    )
`
class Db {
    conn = null
    connect() {
        const dir = os.homedir()  
        const flashPath = path.join(dir, ".flashcards")
        if (!fs.existsSync(flashPath)) fs.mkdirSync(flashPath)
        this.conn = new sqlite3.Database(path.join(flashPath, "database.sqlite"), (err) => {
            if (err) throw "cannot access to database"
            console.info("database is connected")
            this.conn.run(wordTableSql)
        })
    }
}
module.exports = { db: new Db() }