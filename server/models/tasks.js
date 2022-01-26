const { DataTypes } = require('sequelize');
const db = require('../db');

const Tasks = db.define("tasks", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    cleaning: {
        type: DataTypes.INTEGER
    },
    laundry:{
        type: DataTypes.INTEGER
    },
    mealPrep:{
        type: DataTypes.INTEGER
    },
    petCare:{
        type: DataTypes.INTEGER
    },
    shopping:{
        type: DataTypes.INTEGER
    }, 
    carCare:{
        type: DataTypes.INTEGER
    },
    taxes:{
        type: DataTypes.INTEGER
    },
});

module.exports = Tasks;