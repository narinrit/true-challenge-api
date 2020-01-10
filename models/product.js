module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        price: DataTypes.DOUBLE,
        shipmentDays: DataTypes.INTEGER,
    }, {});

    // eslint-disable-next-line no-unused-vars
    Product.associate = function associate(models) {
        // associations can be defined here
    };

    return Product;
};
