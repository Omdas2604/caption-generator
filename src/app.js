const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // 1. Import cors

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const app = express();

// 2. Configure and use the cors middleware
app.use(cors({
    origin: 'http://localhost:5173', // The address of your frontend app
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Your routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
