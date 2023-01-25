const { alias } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
    alias({
        '@': "src"
    })(config);
    return config;
}