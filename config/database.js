require('dotenv').config();

const defaultConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    logging: false,
};

module.exports = {
    development: defaultConfig,
    test: defaultConfig,
    production: defaultConfig,
};
