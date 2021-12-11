// DEPENDENCIES
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const methodOverride = require("method-override");
// CONFIGURATION
const app = express();

// middleware
app.set("views",__dirname + "/views");
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))
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
