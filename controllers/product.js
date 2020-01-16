const express = require('express');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const requireJWTAuth = require('../middlewares/requireJWTAuth');
const models = require('../models');

const router = express.Router();

router.get('/', requireJWTAuth, async (req, res) => {
    const {
        q,
        orderBy = 'id',
        order = 'desc',
    } = req.query;

    const page = +req.query.page || 0;
    const limit = +req.query.limit || 10;
    const offset = page * limit;

    const where = {};

    if (q) {
        where[Op.or] = [
            { name: { [Op.like]: `%${q}%` } },
            { description: { [Op.like]: `%${q}%` } },
        ];
    }

    try {
        const total = await models.Product.count({ where });
        const data = await models.Product.findAll({
            offset,
            limit,
            where,
            order: [[orderBy, order]],
        });

        return res.json({
            page, limit, total, data,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({
            error: error.name,
            message: error.message,
        });
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

    const { images, ...productData } = req.body;

    try {
        const product = models.Product.build(productData);

        await product.save();

        await product.setImages(images.map((image) => models.Image.build(image)));

        return res.json({
            code: '00',
            message: 'Success',
            id: product.id,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({
            error: error.name,
            message: error.message,
        });
    }
});

router.get('/:id', requireJWTAuth, async (req, res) => {
    const { id } = req.params;

    const product = await models.Product.findOne({
        where: { id },
        include: ['images'],
    });

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

    const { images, ...productData } = req.body;

    await product.setImages(images.map((image) => models.Image.build(image)));

    try {
        await product.update(productData);

        return res.json({
            code: '00',
            message: 'Success',
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({
            error: error.name,
            message: error.message,
        });
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
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({
            error: error.name,
            message: error.message,
        });
    }
});

module.exports = router;
