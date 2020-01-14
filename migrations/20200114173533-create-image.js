
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Images', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        normalPath: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        normalName: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        normalWidth: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        normalHeight: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        originalPath: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        originalName: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        originalWidth: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        originalHeight: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: (queryInterface) => queryInterface.dropTable('Images'),
};
