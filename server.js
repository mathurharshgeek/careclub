const express=require('express');
const expressSession=require('express-session');
const MongoDbSession = require("connect-mongodb-session")(expressSession);

const passport=require('passport');
const bodyparser = require('body-parser')
const mongoose=require('mongoose')
const path=require('path')
const flash=require('express-flash')
const {initializingPassport} =require("./passportConfig")
const app=express();
initializingPassport(passport);
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.set("view engine", "ejs");

app.set('views',path.join(__dirname,'/views'));
mongoose
  .connect('mongodb+srv://theharshrooprai:Mathurharsh18@cluster0.klmhr5d.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo Database connected Successfully"))
  .catch((err) => console.log(err + "error"));
  const store = new MongoDbSession({
    uri:'mongodb+srv://theharshrooprai:Mathurharsh18@cluster0.klmhr5d.mongodb.net/',
    collection: "authSession",
  });


  app.use(passport.initialize());
app.use(expressSession({
  secret:'this is my secret',
  store:store,
  resave:false,
  saveUninitialized:true,
 cookie:{maxAge:1000*60*60*24}

 
 
}));
app.use(passport.session())

app.use(flash())
require('./routes')(app);
app.listen(process.env.PORT ||  3000,()=>console.log("app is running"));