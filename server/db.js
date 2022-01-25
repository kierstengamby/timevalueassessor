const { Sequelize } = require('sequelize');

// const seqeulize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
//     host: process.env.DATABASE_HOST,
//     dialect: process.env.DATABASE_DIALECT
// })

const seqeulize = new Sequelize (
    // process.env.DATABASE_URL  || 
    `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost:5432/timevalueassessor`,
    {
        dialect: 'postgres',
    }
)

module.exports = seqeulize;