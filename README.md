## True e-Logistic Full-Stack Challenge (Backend)

This project was created for this challenge.
https://rightman.true-e-logistics.com/full-stack/fullstack-challenge.html

## Stack
- Express.js
- Sequelize
- Passport.js

## How to setup

``` bash
# install dependencies
$ npm install

# Copy and setup .env
$ cp .env.example .env

# migrate a database
$ npx sequelize-cli db:migrate

# seed database data
$ npx sequelize-cli db:seed:all

# start server for development localhost:4000
$ npm run dev

# start server for production at localhost:4000
$ npm start
```
A seeder will create "admin" user with "password" and 20 random products.
