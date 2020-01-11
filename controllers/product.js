const express = require('express');
const { check, validationResult } = require('express-validator');
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

        return res.json({
            page, limit, total, data,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post('/', [
    requireJWTAuth,
    check('name').isString(),
    check('description').isString(),
    check('quantity').isNumeric(),
    check('price').isNumeric(),
    check('shipmentDays').isNumeric(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const product = models.Product.build(req.body);

    try {
        await product.save();

        return res.json({
            code: '00',
            message: 'Success',
            id: product.id,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get('/:id', requireJWTAuth, async (req, res) => {
    const { id } = req.params;

    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
        return res.status(404).json({
            code: '404',
            message: 'Product not found.',
        });
    }

    return res.json(product);
});

router.put('/:id', [
    requireJWTAuth,
    check('name').isString(),
    check('description').isString(),
    check('quantity').isNumeric(),
    check('price').isNumeric(),
    check('shipmentDays').isNumeric(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
        return res.status(404).json({
            code: '404',
            message: 'Product not found.',
        });
    }

    try {
        await product.update(req.body);

        return res.json({
            code: '00',
            message: 'Success',
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.delete('/:id', requireJWTAuth, async (req, res) => {
    const { id } = req.params;

    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
        return res.status(404).json({
            code: '404',
            message: 'Product not found.',
        });
    }

    try {
        await product.destroy();

        return res.json({
            code: '00',
            message: 'Success',
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
