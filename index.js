const express = require("express");
const cors = require("cors");
var User = require('./models/user')
var Record = require('./models/record')
const app = express();
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
app.use(cors());
app.use(express.json());
dotenv.config()
mongoose.connect( "mongodb+srv://derbeder:7mM2sG7ECM3SZTjd@cluster0.fvjjmxo.mongodb.net/",
{
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
     console.log("DB Connection Error: " +err);
});
const config    = require("./config/db");
  app.post("/api/register", (req, res) => {
    console.log(req.body)
    var newUser = User(req.body) 
    console.log(newUser)
    User.create(newUser)
    .then(function(newUser){
        res.status(200).send({"ok":"ok"})
    }).catch(err =>{res.status(500).send("Bir hata oluştu!");})
  });

  app.post("/api/insertRecord", (req, res) => {
    var newRecord = Record(req.body) 
    console.log(newRecord)
    Record.create(newRecord)
    .then(function(newRecord){
        res.status(200).send({"ok":"ok"})
    }).catch(err =>{res.status(500).send("Bir hata oluştu!");})
  });
  app.post("/api/deleteRecord", (req, res) => {
     var idToDelete = req.body.idToDelete

    Record.findByIdAndDelete(idToDelete)
    .then(function(){
        res.status(200).send({"ok":"ok"})
    }).catch(err =>{res.status(500).send("Bir hata oluştu!");})
  });
  app.get("/api/users", (req, res) => {
console.log("ben")
    User.find({})
    .then(function(newUser){
        res.send(newUser)
    }).catch(err => console.log(err))
  });

  app.get("/api/records", (req, res) => {

        Record.find({})
        .then(function(newUser){
            res.send(newUser)
        }).catch(err => console.log(err))
      });


app.listen(5000, () => {
  console.log("Sunucu 5000 portunda çalışıyor!");
});