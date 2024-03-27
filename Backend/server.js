const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const port = 3000;


const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


server.use(express.json());
server.use(cors());
server.use('/users', userRoutes);
server.use('/notes', noteRoutes);
server.use('/categories', categoryRoutes);


mongoose.connect('mongodb://localhost:27017/', {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
