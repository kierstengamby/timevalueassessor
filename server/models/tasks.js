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
        // allowNull: true,
    },
    laundry:{
        type: DataTypes.INTEGER
        // allowNull: true,
    },
    mealPrep:{
        type: DataTypes.INTEGER
        // allowNull: true,
    },
    petCare:{
        type: DataTypes.INTEGER
        // allowNull: true,
    },
    shopping:{
        type: DataTypes.INTEGER
        // allowNull: true,
    }, 
    carCare:{
        type: DataTypes.INTEGER
        // allowNull: true,
    },
    taxes:{
        type: DataTypes.INTEGER
        // allowNull: true,
    },
});

module.exports = Tasks;