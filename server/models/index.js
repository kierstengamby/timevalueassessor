const db = require('../db');

const UsersModel = require('./users');
const TimeValueModel = require('./timevalue');
const TasksModel = require('./tasks');
const ValuesModel = require('./values');

UsersModel.hasMany(TimeValueModel);
UsersModel.hasMany(TasksModel);
UsersModel.hasMany(ValuesModel);

ValuesModel.belongsToMany(UsersModel, ) 
// will this create a whole new table?, how to associate it with multiple other tables' values?

module.exports = {
    dbConnection: db,
    models: {
        UsersModel,
        TimeValueModel,
        TasksModel,
        ValuesModel
    }
};