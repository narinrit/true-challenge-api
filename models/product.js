
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        price: DataTypes.DOUBLE,
        shipmentDays: DataTypes.INTEGER,
    }, {});

    Product.associate = function associate(models) {
        // eslint-disable-next-line no-param-reassign
        models.Product.Images = models.Product.hasMany(models.Image, {
            foreignKey: 'imageableId',
            constraints: false,
            scope: {
                imageableType: 'product',
            },
            as: 'images',
        });
    };

    return Product;
};
