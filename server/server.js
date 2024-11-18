const express = require("express");
const mongoose = require("mongoose");
const login = require("./routes/login");
const kanban = require("./routes/kanban");
const chat = require("./routes/chat");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const http = require('http');
const org=require('./routes/org');
const dashboard=require('./routes/dashboard');

const app = express();
const flash = require('connect-flash');
const port = 5000;


app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}));


const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ocmps',
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
}));


require("./routes/passport");
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/ocmps", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

    app.use(flash());


app.use("/", login);
app.use("/dashboard", kanban);
app.use('/dashboard', chat);
app.use('/dashboard', dashboard);
app.use('/org', org);


server.listen(port, () => {
    console.log("Server is running on port " + port);
});
