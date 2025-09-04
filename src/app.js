const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // 1. Import cors

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',      // Your local Vite dev server
  'https://omdas2604.github.io'  // Your deployed GitHub Pages site
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming origin is on the guest list or if it's not a browser request (like from Postman)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  credentials: true // This is essential for allowing cookies and authorization headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Your routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
