const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const app = express();


connectDB();


app.use(express.json());


app.use(cors());  

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
