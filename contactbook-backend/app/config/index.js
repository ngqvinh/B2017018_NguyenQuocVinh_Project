const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        url: "mongodb://127.0.0.1:27017/animeinfo"
    },
    jwt: {
        secret: "animeinfo-secret-key"
    }
};

module.exports = config;

