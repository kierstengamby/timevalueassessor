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
        type: DataTypes.TIME,
        allowNull: true,
    },
    laundry:{
        type: DataTypes.TIME,
        allowNull: true,
    },
    mealPrep:{
        type: DataTypes.TIME,
        allowNull: true,
    },
    petCare:{
        type: DataTypes.TIME,
        allowNull: true,
    },
    shopping:{
        type: DataTypes.TIME,
        allowNull: true,
    }, 
    carCare:{
        type: DataTypes.TIME,
        allowNull: true,
    },
    taxes:{
        type: DataTypes.TIME,
        allowNull: true,
    },
});

module.exports = Tasks;