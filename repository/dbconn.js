const sqlite3 = require('sqlite3').verbose();

class Db {
    conn = null
    connect() {
        this.conn = new sqlite3.Database("database.sqlite", (err) => {
            if (err) throw "cannot access to database"
            db.conn.run(`
            drop table addresses;
            
            `, (result, err) => { console.log("removed") })
        })
    }
}
module.exports = { db: new Db() }