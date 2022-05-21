const sqlite3 = require('sqlite3').verbose();

class Db {
    conn = null
    connect() {
        this.conn = new sqlite3.Database("database.sqlite", (err) => {
            if (err) throw "cannot access to database"
            console.info("database is connected")
        })
    }
}
module.exports = { db: new Db() }