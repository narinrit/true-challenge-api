const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authController = require('./controllers/auth');
const productController = require('./controllers/product');

app.use('/auth', authController);
app.use('/products', productController);

app.get('/', (req, res) => res.send('Hello World!'));

app.all('*', (req, res) => {
    res.status(404).json({
        status: 404,
        error: 'NotFound',
        message: 'This api endpoint could not be found',
    });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}!`));
