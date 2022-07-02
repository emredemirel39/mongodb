require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const errorHandling = require('./middlewares/errorHandling');

const app = express();
app.use(logger)

const usersRouter = require('./routers/users');

const url = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.0spvi.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url)
const db = mongoose.connection
db.on('error', err => console.error(err));
db.once('open', () => console.log('DB is connected'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Express')
} )

app.use('/users', usersRouter);



app.use(errorHandling);


app.listen(3030, () => console.log('Server is working...'))