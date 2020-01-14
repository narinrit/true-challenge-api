module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        fullName: {
            type: DataTypes.VIRTUAL(DataTypes.STRING, ['firstName', 'firstName']),
            get() {
                return `${this.get('firstName')} ${this.get('lastName')}`;
            },
        },
        role: DataTypes.STRING,
    }, {});

    // eslint-disable-next-line no-unused-vars
    User.associate = function associate(models) {
        // associations can be defined here
    };

    User.prototype.toJSON = function toJSON() {
        const { password, ...values } = this.get();
        return values;
    };

    return User;
};
