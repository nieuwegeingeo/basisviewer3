module.exports = {
    "env": {
        "browser": true,
        // "commonjs": true,
        // "es6": true,
        "jquery": true
    },
    "extends": "eslint:recommended",

    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "esversion": 6,
        "sourceType": "module"
    },
    "rules": {
        "semi": 1,
        "no-unused-vars": 0,
        "no-undef": 0
    },
};