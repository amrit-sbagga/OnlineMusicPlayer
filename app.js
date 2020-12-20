const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const mongodbConfig = require('./configjs/mongodb');

const musicRoutes = require("./routes/music_album");
const mongodb = require("./configjs/mongodb");

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(cookieParser());
app.use(session({
    key: "testkey1",
    secret: "testvalue1",
    resave: true, 
    saveUninitialized: true,
    cookie: {secure: false, maxAge:1*60*60*1000}
}));
//app.use(flash(app));
app.use(flash())

mongodb.connect(()=>{
    console.log("Connected to MongoDB in Express");
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use('/music', musicRoutes);

app.use('/', (req, res, next) => {
    res.status(404).send("<h1>Page not found!</h1>");
});

app.listen(3300);

console.log("Server is listening on port 3300...");