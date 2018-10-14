const Sequelize = require('sequelize');
var config = require('./config_db');

const db = new Sequelize(
    config.postgres.database,
    config.postgres.username,
    config.postgres.password,
    {
        host: config.postgres.host,
        dialect: 'postgres'
    }
);

module.exports = db;

