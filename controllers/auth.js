const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const requireJWTAuth = require('../middlewares/requireJWTAuth');
const models = require('../models');

const router = express.Router();

router.post('/login', [
    check('username').isString(),
    check('password').isString(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validate error',
            errors: errors.array(),
        });
    }

    const { username, password } = req.body;

    const user = await models.User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Wrong username or password' });
    }

    const payload = {
        sub: user.id,
    };

    return res.json({
        code: '00',
        message: 'Success',
        token: jwt.sign(payload, process.env.SECRET_KEY),
    });
});

router.get('/me', requireJWTAuth, (req, res) => res.json(req.user));

module.exports = router;
