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
const org = require('./routes/org');
const dashboard = require('./routes/dashboard');

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

// Authentication middleware
function authMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized access. Please log in." });
}

// Routes
app.use("/", login);
app.use("/dashboard", authMiddleware, kanban);
app.use("/dashboard", authMiddleware, chat);
app.use("/dashboard", authMiddleware, dashboard);
app.use("/org", authMiddleware, org);

server.listen(port, () => {
    console.log("Server is running on port " + port);
});