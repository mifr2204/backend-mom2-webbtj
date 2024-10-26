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

app.use(express.json());
app.use(cors({
}));

//Start av applikationen
app.listen(port, () => {
    console.log("Started on port: " + port);
});


//hämta alla arbetsplatser
app.get("/workplaces", (req, res) => {
    //Hämta data från db
    db.all("SELECT * FROM workplaces;", (err, results) => {
       
        if(err) {
          res.status(500).json({error: "Error" + err});
          return;
        }
        if(results.length === 0) {
            res.status(404).json({message: "No workplaces found"});
        }else{
            res.json(results);
        }
    })
});

//radera arbetsplats
app.delete('/workplaces/:id', (req, res) => {
  
  let id = req.params.id;
 
 
  db.all("SELECT * FROM workplaces WHERE id=" + id + ";", (err, results) => {
  
    if(err) {
      res.status(500).json({error: "Error" + err});
      return;
    }
    if(results.length === 0) {
        res.status(404).json({message: "No workplaces found"});
    }else{
      const stmt = db.prepare("DELETE FROM workplaces WHERE id=?;", (err, results) => {

        if(err) {
          res.status(500).json({error: "Error" + err});
          return;
        }
        stmt.run(id);
        stmt.finalize();

        res.json({message: "The workplace is deleted ", id});
        
      })
    } 
  }) 
});

//lägga till arbetsplats
app.post("/workplaces", (req, res) => {
    let companyname = req.body.companyname;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let title = req.body.title;
    let description = req.body.description;

    //felhantering
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if(!companyname || !location || !startdate || !enddate || !title || !description) {
        
        errors.message = "All fields need to be filled in"
        errors.detail = "Företagsnamn, plats, startdatum, slutdatum, titel och beskrivning måste finnas med i JSON"
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;
        
        res.status(400).json(errors);
     
        return;
    }

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

//ändra arbetsplats
app.put("/workplaces/:id", (req, res) => {
    let id = req.params.id;
    let companyname = req.body.companyname;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let title = req.body.title;
    let description = req.body.description;

    //felhantering
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if(!companyname || !location || !startdate || !enddate || !title || !description) {
        
      errors.message = "All fields needs to be filled in"
      errors.detail = "Företagsnamn, plats, startdatum, slutdatum, titel och beskrivning måste finnas med i JSON"
      errors.https_response.message = "Bad request";
      errors.https_response.code = 400;
      
      res.status(400).json(errors);
   
      return;
  }
  //hämtar arbetsplats och ändrar den
  db.all("SELECT * FROM workplaces WHERE id=" + id + ";", (err, results) => {
   
    if(err) {
      res.status(500).json({error: "Error" + err});
      return;
    }
    if(results.length === 0) {
        res.status(404).json({message: "No workplaces found"});
    }else{
      const stmt = db.prepare('UPDATE workplaces SET companyname=?, location=?, startdate=?, enddate=?, title=?, description=? WHERE id=?;', (err, results) => {
      if(err){
          res.status(500).json({error: "something went wrong:" + err});
          return;
      }
      stmt.run(companyname, location, startdate, enddate, title, description, id);
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

      res.json({message: "The workplace is updated", workplace});
        
      })
    } 
  }) 
});