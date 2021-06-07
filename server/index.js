const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const dotenv = require('dotenv');

const app = express();
dotenv.config();




mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true } ,
() => console.log('connect to db'));

//mmiddlewares
app.use(express.json());


//route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});