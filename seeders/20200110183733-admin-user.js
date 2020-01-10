const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: bcrypt.hashSync('password', 8),
        firstName: 'John',
        lastName: 'Doe',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete('Users', { username: 'admin' }, {}),
};
