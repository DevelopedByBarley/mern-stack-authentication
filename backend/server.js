const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const colors = require('colors')
const connectDb = require('./config/db/db')
const port = process.env.PORT || 5000;

connectDb();

const {errorHandler} = require('./middleware/error.middleware')
const goalsRouter = require('./routes/goalRoutes')
const userRouter = require('./routes/userRoutes')

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalsRouter);
app.use('/api/users', userRouter);

app.use(errorHandler)


app.listen(port, () => {console.log(`Server is started on ${port}`)})