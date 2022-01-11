const { DataTypes } = require('sequelize');
const db = require('../db');

const TimeValue = db.define("timevalue", {
    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    },
    hourlyWage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    neutralValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = TimeValue;