const { DataTypes } = require('sequelize');
const db = require('../db');

const Values = db.define("values", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    cleaningValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    laundryValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mealPrepValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    petCareValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shoppingValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    carCareValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    taxesValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Values;