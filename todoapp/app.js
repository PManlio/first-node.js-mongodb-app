var express = require('express');
var todoController = require('./controllers/todoController');//prende la funzione di todoController.js e la salva in questa variabile
//set up template engine
var app = express();
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app); //prende la funzione conservata nella variabile todoController

//listen to a port
app.listen(3000);
console.log('You are listening to port 3000');

//ora divideremo il file in Model - Controller - View (node JS lezione 32 the net ninja) = MVC
//Model: Data - e.g: todos & users
//controller: controlla l'app + sezioni - e.g: todoController & userController
//View: template foòes (EJS) - e.g: todo.ejs & account.ejs
