require('dotenv').config();

const express = require('express');
const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');

const app = express();

app.use(middleware.CORS);
app.use(express.json());

app.use('/auth', controllers.userscontroller);
app.use('/timevalue', controllers.timevaluecontroller);
app.use('/tasks', controllers.taskscontroller);
app.use('/values', controllers.valuescontroller);
app.use(middleware.validateSession);

try {
    dbConnection
    .authenticate()
    .then(async () => await dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    });
} catch (err) {
    console.log('[SERVER]: Server crashed');
    console.log(err);
}