const faker = require('faker');

module.exports = {
    up: (queryInterface) => {
        const records = [];

        for (let i = 0; i < 20; i += 1) {
            records.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productAdjective(),
                price: faker.commerce.price(),
                quantity: faker.random.number(1000),
                shipmentDays: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        return queryInterface.bulkInsert('Products', records, {});
    },

    down: (queryInterface) => queryInterface.bulkDelete('Products', null, {}),
};
