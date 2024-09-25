//Anslutning för Sqlite
const sqlite3 = require("sqlite3").verbose();
//Skapa databas
const db = new sqlite3.Database("./db/CV.db");
//kör flera kommandon i ordning

db.serialize(() => {
    db.run(
        "DROP TABLE IF EXISTS workplaces"
    );
    //Skapar tabell
    db.run(
        `CREATE TABLE IF NOT EXISTS workplaces (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            companyname TEXT NOT NULL,
            location TEXT NOT NULL,
            startdate DATE NOT NULL,
            enddate DATE NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );`
    );
});

//prepared statements som ökar säkerheten
const stmt = db.prepare('INSERT INTO workplaces(companyname, location, startdate, enddate, title, description) VALUES(?,?,?,?,?,?);');

stmt.run("Arbetsp 1", "Nässjö", "2022-01-01", "2023-01-01", "Slav", "tråkiga sysslor");
stmt.finalize();

db.close();
