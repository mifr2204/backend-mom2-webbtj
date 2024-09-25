/*
 * Arbetslivserfarenheter
 * Av Mikaela Frendin
 */

const express = require('express');
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

//Anslutning till databasen
const db = new sqlite3.Database("./db/CV.db");

//inställningar för databasen
const app = express();
const port = 3000;

//app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());

//Start av applikationen
app.listen(port, () => {
    console.log("Started on port: " + port);
});

app.get("/workplaces", (req, res) => {
    //Hämta data från db
    db.all("SELECT * FROM workplaces;", (err, results) => {
        //db.all("SELECT * FROM workplaces;", (err, rows) => {
        if(err) {
          res.status(500).json({error: "Error" + err});
          return;
            //console.error(err.message);
        }
        if(results.length === 0) {
            res.status(200).json({message: "No workplaces found"});
        }else{
            res.json(results);
        }
    })
});

app.post("/workplaces", (req, res) => {
    let companyname = req.body.companyname;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let title = req.body.title;
    let description = req.body.description;

    const stmt = db.prepare('INSERT INTO workplaces(companyname, location, startdate, enddate, title, description) VALUES(?,?,?,?,?,?);',[companyname, location, startdate, enddate, title, description], (err, results) => {
        if(err){
            res.status(500).json({error: "something went wrong:" + err});
            return;
        }
        stmt.run(companyname, location, startdate, enddate, title, description);
        stmt.finalize();
    
        //skapar objekt
        let workplace = {
            companyname: companyname,
            location: location,
            startdate: startdate,
            enddate: enddate,
            title: title,
            description: description
        };

        res.json({message: "The workplace is added", workplace});
    });
    
});

//app.use(bodyParser.urlencoded({ extended: true }));
/*
//Routing index
app.get('/', (req, res) => {
  //lista kurser
  db.all("SELECT * FROM coursers;", (err, rows) => {
    if(err) {
      console.error(err.message);
    }

    res.render("index", {
      error: "",
      rows: rows
    });

  });
});

//Routing add
app.get('/add', (req, res) => {

  res.render("add", {
    error: "",
    message: "",
  });

});

//Routing about
app.get('/about', (req, res) => {

  res.render("about", {
    error: "",
  });

});

//Routing edit
app.get('/edit', (req, res) => {

  res.render("edit", {
    error: "",
  });

});

//skapa ny kurs
app.post("/add", (req, res) => {
  let name = req.body.name;
  let code = req.body.code;
  let progression = req.body.progression;
  let syllabus = req.body.syllabus;
  let error = "";
  let message = "";

  //Kontroll av input ny kurs
  if(name != "" && code != "" && progression != "" && syllabus != "") {
    const stmt = db.prepare('INSERT INTO coursers(name, code, progression, syllabus) VALUES(?,?,?,?);');
    stmt.run(name, code, progression, syllabus);
    stmt.finalize();
    message = "Kursen är tillagd";
    res.render("add", {
      message: message,
      error: "",
    });
  }else{
    error = "Alla fält måste fyllas i!";
  }
  
  res.render("add", {
    error: error,
    message: "",
  });

});

//Ta bort kurs
app.get("/delete/:id", (req, res) => {
  let id = req.params.id;

  //ta bort kurs från databasen
  db.run("DELETE FROM coursers WHERE ID=?;", id, (err) => {
    if(err) {
      console.error(err.message);
    }

    //skicka till startsidan
    res.redirect("/");
  });

});

//hämta ändra kurs sida
app.get("/edit/:id", (req, res)  => {
  let id = req.params.id;

  //Hämta kurs i databasen
  db.get("SELECT * FROM coursers WHERE ID=?;", id, (err, row) => {
    if(err) {
      console.error(err.message);
    }
    //visa edit sidan
    res.render("edit", {
      row: row,
      error: ""
    });
  });
});
//Ändra kurs
app.post("/edit/:id", (req, res)  => {
  let id = req.params.id;
  let name = req.body.name;
  let code = req.body.code;
  let progression = req.body.progression;
  let syllabus = req.body.syllabus;
  let error = "";
  //kontroll input
  if(name != "" && code != "" && progression != "" && syllabus != "") {
    const stmt = db.prepare('UPDATE coursers SET name=?, code=?, progression=?, syllabus=? WHERE id=?');
    stmt.run(name, code, progression, syllabus, id);
    stmt.finalize();
    res.redirect("/");
  }else{
    error = "Alla fält måste vara ifyllda, försök igen";
  }
  
//Hämta kurs i databasen
db.get("SELECT * FROM coursers WHERE ID=?;", id, (err, row) => {
  if(err) {
    console.error(err.message);
  }
  //visa edit sidan
  res.render("edit", {
    row: row,
    error: error
  });
});
    
});



*/