//requires
var express = require('express');
var path = require("path");//n
console.log(__dirname)

// var User = require('./models/User');

var mongoose = require('mongoose');


//required routes
var userRouter = require('./routes/users');//n
var indexRouter = require('./routes/index')


//connect to database
mongoose.connect(
  "mongodb://localhost:27017/express-crud",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  err => {
    console.log("connected", err ? err : true);
  }
);

var PORT = process.env.PORT || 9003;

//express app
var app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//middleware for ejs
app.set("view engine", "ejs");//n
app.set("views", path.join(__dirname, "views"));//n


//routes middleware
app.use("/", indexRouter)
app.use("/users", userRouter);//n



//routes
// app.get("/", (req, res, next) => {
//     res.render("index")
// })

//error handler middleware
app.use((req, res, next) => {
    res.status(404).send("Page not found");
})

//custom error made either by the client or by the server
app.use((err,req, res, next) => {
    res.status(400).send(err);
})

//listener
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
})