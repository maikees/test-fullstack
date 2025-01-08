module.exports = function override(config, env) {
    config.watchOptions = {
        poll: 1000, // Verifica mudanças a cada 1 segundo
        aggregateTimeout: 300, // Atraso de 300ms antes de recompilar
    };
    return config;
};