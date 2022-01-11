const db = require('../db');

const UsersModel = require('./users');
const TimeValueModel = require('./timevalue');
const TasksModel = require('./tasks');
const ValuesModel = require('./values');

UsersModel.hasMany(TimeValueModel);
UsersModel.hasMany(TasksModel);
UsersModel.hasMany(ValuesModel);

// ValuesModel.belongsTo(UsersModel);
// ValuesModel.belongsTo(TimeValueModel);
// ValuesModel.belongsTo(TasksModel);

module.exports = {
    dbConnection: db,
    models: {
        UsersModel,
        TimeValueModel,
        TasksModel,
        ValuesModel
    }
};