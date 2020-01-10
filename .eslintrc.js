module.exports = {
    extends: 'airbnb-base',
    env: { node: true },
    rules: {
        'max-len': ['error', { 'code': 200 }],
        'indent': ['error', 4, {
            'SwitchCase': 1,
        }],
    },
};
