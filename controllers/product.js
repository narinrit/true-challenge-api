const express = require('express');
const requireJWTAuth = require('../middlewares/requireJWTAuth');
const models = require('../models');

const router = express.Router();

router.get('/', requireJWTAuth, async (req, res) => {
    const page = +req.query.page || 0;
    const limit = +req.query.limit || 10;
    const offset = page * limit;

    const where = {};

    try {
        const total = await models.Product.count({ where });
        const data = await models.Product.findAll({ offset, limit, where });

        res.json({
            page, limit, total, data,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', requireJWTAuth, async (req, res) => {
    const product = models.Product.build(req.body);

    try {
        await product.save();
        res.json({
            code: '00',
            message: 'Success',
            id: product.id,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', requireJWTAuth, async (req, res) => {
    const { id } = req.params;

    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
        res.status(404).json({
            code: '404',
            message: 'Product not found.',
        });
        return;
    }

    res.json(product);
});

router.put('/:id', requireJWTAuth, async (req, res) => {
    const { id } = req.params;

    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
        res.status(404).json({
            code: '404',
            message: 'Product not found.',
        });
        return;
    }

    try {
        await product.update(req.body);
        res.json({
            code: '00',
            message: 'Success',
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', requireJWTAuth, async (req, res) => {
    const { id } = req.params;

    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
        res.status(404).json({
            code: '404',
            message: 'Product not found.',
        });
        return;
    }

    try {
        await product.destroy();
        res.json({
            code: '00',
            message: 'Success',
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
