// DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
// CONFIGURATION
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

// Middleware
app.set("views",__dirname + "/views");
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to database") )

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the bread app!")
});


// BREADS
const breadsController = require("./controllers/breads_controller")
app.use('/breads', breadsController);

// 404 PAGE
app.get("*", (req, res) => {
    res.send("404");
})

// LISTEN
app.listen(PORT, () => {
    console.log(`\n***Listening on port:${PORT}***\n`)
});
