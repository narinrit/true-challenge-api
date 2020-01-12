
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        description: {
            allowNull: false,
            type: Sequelize.TEXT,
        },
        quantity: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        price: {
            allowNull: false,
            type: Sequelize.DOUBLE,
        },
        shipmentDays: {
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
    down: (queryInterface) => queryInterface.dropTable('Products'),
};
