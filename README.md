I detta repository har jag skapat en enkel REST API med Express.
Jag har använt Sqlite3 som databas. 
Funktionalitet för CRUD finns
CORS har inga begränsningar i denna applikation men skulle ha i andra situationer

Apiet använder port 3000
När databasen är startad kan man starta en lokal webbserver med port 5500 och kan då se webbplatsen 
ex http://127.0.0.1:5500/index.html

Länk
En liveversioI detta repository har jag skapat en webbplats som kommunicerar med en enkel REST API med Express.

Webbplatsen använder html, css och javascript. Anropen till apiet sker med Fetch api

Information om APIet:
Jag har använt Sqlite3 som databas. 
Funktionalitet för CRUD finns

Länk till webbsida
https://studenter.miun.se/~mifr2204/writeable/azure_backend-mom2-sida/add.html

länk till app
https://backendm2.azurewebsites.net/

länk till git webbtjänst
https://github.com/mifr2204/backend-mom2-webbtj.git

länk till git webbsida
https://github.com/mifr2204/backend-mom2-sida.git

Installation, databas
Sqlite3 används som databas av APIet. Klona ner källkodsfilerna, kör kommandot: npm install 
Andvänd kommandot: npm run install för att installera Installations-skriptet skapar följande databastabeller:

Tabell   	Fält
workplaces	id (INTEGER), companyname (TEXT), location (TEXT), startdate(DATE), enddate (DATE), title (TEXT), description (TEXT), timestamp (TIMESTAMP)

Användning
Hur man nå APIet:

Metod	Ändpunkt	    Beskrivning
GET	    /workplaces	    Hämtar alla tillgängliga arbetsplatser.
POST	/workplaces	    Lagrar en ny arbetsplats.
PUT	    /workplaces/:ID	Uppdaterar en arbetsplats. 
DELETE	/workplaces/:ID	Raderar en arbetsplats.


Ett arbetsplats-objekt returneras/skickas som JSON med följande struktur:

{
   "companyname": "Frösunda",
   "location": "Nässjö",
   "startdate": "2010-01-01",
   "enddate": "2016-02-01",
   "title": "Personlig assistent/teamleader",
   "description": "Vara hos olika kunder och hjälpa dom i vardagen, planera schema med mera"
}n av APIet finns tillgänglig på följande URL: https://testserver.test/courses

Installation, databas

Sqlite3 används som databas av APIet. Klona ner källkodsfilerna, kör kommandot: npm install 
För att starta applikationen kör npm start 

Install skapar följande databastabeller:

Tabell:  workplaces 	
Fält:
id (INTEGER), companyname (TEXT), location (TEXT), startdate(DATE), enddate (DATE), title (TEXT), description (TEXT), timestamp (TIMESTAMP)

Användning
Hur man nå APIet:

Metod	Ändpunkt	    Beskrivning
GET	    /workplaces	    Hämtar alla tillgängliga arbetsplatser.
POST	/workplaces	    Lagrar en ny arbetsplats.
PUT	    /workplaces/:ID	Uppdaterar en arbetsplats. 
DELETE	/workplaces/:ID	Raderar en arbetsplats.


Ett arbetsplats-objekt returneras/skickas som JSON med följande struktur:

{
   "companyname": "Frösunda",
   "location": "Nässjö",
   "startdate": "2010-01-01",
   "enddate": "2016-02-01",
   "title": "Personlig assistent/teamleader",
   "description": "Vara hos olika kunder och hjälpa dom i vardagen, planera schema med mera"
}




*****************************************



Länk
Apiet finns live på: https://backendm1.azurewebsites.net/



