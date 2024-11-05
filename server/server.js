    const express = require("express");
    const bodyParser = require("body-parser");
    const mongoose = require("mongoose");
    const login = require("./routes/login");
    const cors = require("cors");
    const session = require("express-session");
    const MongoStore = require("connect-mongo");
    const passport = require("passport");

    const app = express();
    const port = 5000;

    app.use(cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 204,
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

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
            maxAge: 1000 * 60 * 60 * 24,
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
            console.log(err);
        });
        
    app.use("/", login);

    app.listen(port, () => {
        console.log("Server is running on port " + port);
    });
