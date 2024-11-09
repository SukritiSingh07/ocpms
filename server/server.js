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

const app = express();
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

// Socket.io connection
io.on('connection', (socket) => {
    console.log('User connected');
    
    // Join a specific project room
    socket.on('joinRoom', ({ projectId }) => {
        socket.join(projectId);
        console.log(`User joined room: ${projectId}`);
    });

    // Sending and receiving messages
    socket.on('sendMessage', async ({ projectId, senderId, text }) => {
        try {
            const newMessage = { sender: senderId, text };
            io.to(projectId).emit('receiveMessage', {
                sender: senderId,
                text,
                timestamp: new Date(),
            });
        } catch (error) {
            console.error('Error in sendMessage:', error);
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

// Routes
app.use("/", login);
app.use("/dashboard", kanban);
app.use('/dashboard', chat);

// Start the server
server.listen(port, () => {
    console.log("Server is running on port " + port);
});
