var express       = require('express');
var path          = require("path");
var MongoClient   = require('mongodb').MongoClient;
var app           = express();
var bodyParser    = require('body-parser');
var mongoSanitize = require('express-mongo-sanitize');
var exphbs        = require('express-handlebars');
var http          = require('http');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// GET ALL USERS
app.get('/', function (req, res) {
  MongoClient.connect("mongodb://localhost/bairesdev", function(err, db) {
    if(!err){
      collection = db.collection('users');
      collection.find({}).toArray(function(err,users){
        console.log(users)
        res.send(users);
      });
      db.close();
    }else{
      //RISE EXCEPTION
      throw err
    }

  })
})

// CREATE NEW USER
app.post('/create', function (req, res) {
  console.log(req.body)
  MongoClient.connect("mongodb://localhost/bairesdev", function(err, db) {
    if(!err){
      var user = { first_name: req.body.first_name, last_name: req.body.last_name, age:req.body.age, email: req.body.email};
      db.collection("users").insertOne(user, function(err, response) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
        res.send(response)
      });
    }else{
      //RISE EXCEPTION
      throw err
    }
  })
})
app.delete('/delete', function (req, res) {
  MongoClient.connect("mongodb://localhost/bairesdev", function(err, db) {
    if(!err){
      db.collection('users').find({'uid':req.params.uid} ,function(err,users){
        console.log(users)
        // return users;
      });
    }else{
      //RISE EXCEPTION
      throw err
    }
  })
})
app.put('/update', function (req, res) {
  MongoClient.connect("mongodb://localhost/bairesdev", function(err, db) {
    if(!err){
      db.collection('users').find({'uid':req.params.uid} ,function(err,users){
        console.log(users)
        // return users;
      });
    }else{
      //RISE EXCEPTION
      throw err
    }
  })
})

app.listen(3000, function() {
  console.log("Server running http://localhost:3000");
});
