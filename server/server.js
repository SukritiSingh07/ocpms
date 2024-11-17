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
const { Server } = require('socket.io');
const org=require('./routes/org');
const dashboard=require('./routes/dashboard');

const app = express();
const flash = require('connect-flash');
const port = 5000;

// Setting up CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}));

// Creating HTTP server
const server = http.createServer(app);

// Socket.io initialization
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
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

// Passport initialization
require("./routes/passport");
app.use(passport.initialize());
app.use(passport.session());

io.on('connection', (socket) => {
    // console.log('User connected');

    socket.on('joinRoom', ({ projectId }) => {
        socket.join(projectId);
        console.log(`User joined room: ${projectId}`);
    });

    socket.on('sendMessage', async ({ projectId, senderId, senderName, text }) => {
        try {
            console.log('Message received on server:', { projectId, senderId, senderName, text });  // Debugging line
            const newMessage = { projectId, senderId, senderName, text };
            // Save message to DB and emit
            const message = await Message.create(newMessage);
            console.log('Broadcasting message:', message);  // Debugging line
            io.to(projectId).emit('receiveMessage', message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/ocmps", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

    app.use(flash());

// Routes
app.use("/", login);
app.use("/dashboard", kanban);
app.use('/dashboard', chat);
app.use('/dashboard', dashboard);
app.use('/org', org);

// Start the server
server.listen(port, () => {
    console.log("Server is running on port " + port);
});
