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

stmt.run("Frösunda", "Nässjö", "2010-01-01", "2016-02-01", "Personlig assistent/teamleader", "Vara hos olika kunder och hjälpa dom i vardagen, planera schema med mera");
stmt.run("Nytida", "Taberg", "2016-02-01", "2020-08-01", "Gruppchef", "Schemaläggning, varksamhetsplanering, hålla personalmöten m.m.");
stmt.run("Espressohouse", "Nässjö", "2023-06-01", "2024-10-07", "Barista", "Tillverka och servera olika drycker och lättare måltider");
stmt.finalize();

db.close();
