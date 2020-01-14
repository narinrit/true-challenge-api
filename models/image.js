const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        imageableId: DataTypes.INTEGER,
        imageableType: DataTypes.STRING,
        normalPath: DataTypes.STRING,
        normalName: DataTypes.STRING,
        normalWidth: DataTypes.INTEGER,
        normalHeight: DataTypes.INTEGER,
        normalKey: {
            type: DataTypes.VIRTUAL(DataTypes.STRING, ['normalPath', 'normalName']),
            get() {
                return `${this.get('normalPath')}${this.get('normalName')}`;
            },
        },
        normalUrl: {
            type: DataTypes.VIRTUAL(DataTypes.STRING, ['normalKey']),
            get() {
                const params = {
                    Bucket: process.env.AWS_BUCKET,
                    Key: this.get('normalKey'),
                };
                return s3.getSignedUrl('getObject', params);
            },
        },
        originalPath: DataTypes.STRING,
        originalName: DataTypes.STRING,
        originalWidth: DataTypes.INTEGER,
        originalHeight: DataTypes.INTEGER,
        originalKey: {
            type: DataTypes.VIRTUAL(DataTypes.STRING, ['originalPath', 'originalName']),
            get() {
                return `${this.get('originalPath')}${this.get('originalName')}`;
            },
        },
        originalUrl: {
            type: DataTypes.VIRTUAL(DataTypes.STRING, ['originalKey']),
            get() {
                const params = {
                    Bucket: process.env.AWS_BUCKET,
                    Key: this.get('originalKey'),
                };
                return s3.getSignedUrl('getObject', params);
            },
        },
    }, {});

    // eslint-disable-next-line no-unused-vars
    Image.associate = function associate(models) {
        // eslint-disable-next-line no-param-reassign
        models.Image.Product = models.Image.belongsTo(models.Product, { foreignKey: 'imageableId', constraints: false, as: 'product' });
    };

    return Image;
};
