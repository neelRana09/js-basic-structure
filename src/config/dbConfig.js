const { Sequelize } = require('sequelize');
const { appConfig } = require('./appConfig');

console.log("DB Server Structure Model");

// Common Sequelize config
const baseConfig = {
    database: appConfig.db_name,
    username: appConfig.db_username,
    password: appConfig.db_password,
    dialect: 'mysql',
    logging: false,
    timezone: '+00:00',
    host: 'localhost'
};

// Function to create Sequelize instance
function createSequelizeInstance(config) {
    return new Sequelize(config.database, config.username, config.password, config);
}

// Create reader and writer instances
const dbReader = { sequelize: createSequelizeInstance(baseConfig) };
const dbWriter = { sequelize: createSequelizeInstance(baseConfig) };

// Array of both DB instances
const dbInstances = [dbReader, dbWriter];

// Load models and setup associations
dbInstances.forEach(instance => {
    // Load models
    instance.users = require('../models/userModel')(instance.sequelize, Sequelize);

    // Setup associations
    Object.keys(instance).forEach(modelName => {
        if (instance[modelName]?.associate) {
            instance[modelName].associate(instance);
        }
    });
});

// Optional: Attach Sequelize constructor (can be removed if unused)
dbReader.sequelize = Sequelize;
dbWriter.sequelize = Sequelize;

module.exports = { dbReader, dbWriter };
