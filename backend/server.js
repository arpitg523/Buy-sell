require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');

//express app 
const app = express();

app.use(express.json());

// const cors = require('cors');
// app.use(cors());
app.get('/', (req, res) => {
res.send('Backend is running');
});
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only frontend to access the backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Methods allowed
  credentials: true,
}));
   

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

//connecting to the database 
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log('Connection established to db');
// })
// .catch(err => {
//     console.log(err.message);
// })

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
  

//listen on some port 
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});