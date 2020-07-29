var bodyParser =  require('body-parser');
//var data =[{item:'get milk'},{item:'walk dog'}];
var mongoose = require("mongoose");


//connect database
mongoose.connect(process.env.MONGODB_URI||'mongodb://test:test@crisbase-shard-00-00.blcjj.mongodb.net:27017,crisbase-shard-00-01.blcjj.mongodb.net:27017,crisbase-shard-00-02.blcjj.mongodb.net:27017/CrisBase?ssl=true&replicaSet=atlas-c0jfn6-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
       console.error(err);
    else
       console.log("Connected to the mongodb"); 
  });

//create schema
var todoSchema = new mongoose.Schema({
    item: String
});

///create model
var Todo = mongoose.model('Todo',todoSchema);



var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){ 
    //we will pass the server app

app.get('/todo',function(req,res){
 //res.render('todo',{todos:data}); //we passed data to the view

 //get data from database
 Todo.find({},function(err,data){
     if(err) throw err;
     res.render('todo',{todos:data});

 }); //all of the items

});

app.post('/todo',urlencodedParser,function(req,res){
    const obj = JSON.parse(JSON.stringify(req.body));
//data.push(obj);
//res.json(data);

//get data and add it to mongodb
var newTodo = Todo(obj).save(function(err,data){
    if( err) throw err;
    
    res.json(data);
});

});

app.delete('/todo/:item', function(req, res){

      //data = data.filter(function(todo){
      //  let replaced= (todo.item).replace(/ /g, '');
    //    return replaced !== req.params.item;
    //});
    //res.json(data);
   

    Todo.find({item:req.params.item.substr(1).replace(/\-/g,' ')}).deleteOne(function(err,data){
        if (err) throw err;
        res.json(data);
    })
  
});


};