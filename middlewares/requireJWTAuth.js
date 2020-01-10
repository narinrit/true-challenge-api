const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const models = require('../models');

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(strategyOptions, async (payload, done) => {
    const user = await models.User.findOne({ where: { id: payload.sub } });
    done(null, user);
});

passport.use('jwt', jwtStrategy);

module.exports = passport.authenticate('jwt', { session: false }, null);
