var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://manli0:manli0@ds143893.mlab.com:43893/todo_node_lessons');

//create a schema - è come un blueprint
var todoSchema = new mongoose.Schema({//lo schema ci dice che genere di informazioni ci dobbiamo aspettare
  item: String
});

//dopo creiamo un model basato sullo schema creato sopra
var Todo = mongoose.model('Todo', todoSchema);// SOSTANZIALMENTE IL MODEL E' UNA COLLECTION

//poi creiamo un item di questo modello a cui passiamo un oggetto e lo salviamo nel database
/*var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});*/


//var data=[{item:'get milk'}, {item:'walk dog'}, {item: 'kick some coding ass'}];

var urlencodedParser = bodyParser.urlencoded({extended:false});//middleware che vogliamo eseguire nella POST sottostante

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});//adesso i data sono quelli restituiti dal metodo .find()
    });

  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    })
    //data.push(); //il metodo push in javascript ci permette di aggiungere un oggetto ad un array
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

}
