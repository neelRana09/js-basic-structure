const { Sequelize } = require('sequelize');
const { appConfig } = require('./appConfig');
var path = require('path');

const sql = {
    database: appConfig.db_name,
    username: appConfig.db_username,
    password: appConfig.db_password,
    dialect: 'mysql',
    logging: false,
};
let sqlReader, sqlWriter;

console.log("DB Server Structure Model");
sqlReader = {
    ...sql,
    host: 'localhost',
    timezone: '+00:00'
};

sqlWriter = {
    ...sql,
    host: 'localhost',
    timezone: '+00:00'
};

var [dbReader, dbWriter] = [{
    sequelize: new Sequelize(
        sql.database,
        sql.username,
        sql.password,
        sqlReader
    )
}, {
    sequelize: new Sequelize(
        sql.database,
        sql.username,
        sql.password,
        sqlWriter
    )
}];

var DbInstance = [{
    'name': dbReader
}, {
    'name': dbWriter
}];

DbInstance.forEach(element => {
    // Model Map
    element.name['users'] = require(path.join('../models', './userModel'))(element.name['sequelize'], Sequelize);

    // Model Association
    Object.keys(element.name).forEach(function (modelName) {
        if ('associate' in element.name[modelName]) {
            element.name[modelName].associate(element.name);
        }
    });
});


dbReader.sequelize = Sequelize;
dbWriter.sequelize = Sequelize;

module.exports = { dbReader, dbWriter };
