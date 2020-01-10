const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const requireJWTAuth = require('../middlewares/requireJWTAuth');
const models = require('../models');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await models.User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: 'Wrong username or password' });
        return;
    }

    const payload = {
        sub: user.id,
    };

    res.json({
        message: 'Success',
        token: jwt.sign(payload, process.env.SECRET_KEY),
    });
});

router.get('/me', requireJWTAuth, (req, res) => {
    res.json(req.user);
});

module.exports = router;
