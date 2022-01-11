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
        type: DataTypes.NUMBER,
        allowNull: true,
    },
    laundry:{
        type: DataTypes.NUMBER,
        allowNull: true,
    },
    mealPrep:{
        type: DataTypes.NUMBER,
        allowNull: true,
    },
    petCare:{
        type: DataTypes.NUMBER,
        allowNull: true,
    },
    shopping:{
        type: DataTypes.NUMBER,
        allowNull: true,
    }, 
    carCare:{
        type: DataTypes.NUMBER,
        allowNull: true,
    },
    taxes:{
        type: DataTypes.NUMBER,
        allowNull: true,
    },
});

module.exports = Tasks;