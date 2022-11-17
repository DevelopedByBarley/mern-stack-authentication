const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

const {errorHandler} = require('./middleware/error.middleware')
const goalsRouter = require('./routes/goalRoutes')

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalsRouter);

app.use(errorHandler)


app.listen(port, () => {console.log(`Server is started on ${port}`)})