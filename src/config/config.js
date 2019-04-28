var config = {
  development: {
    port: 8080,
    DB: {
      url:
        "postgres://mkinsman:" +
        process.env.PASSWORD +
        "@localhost:5432/newworldcoordinates"
    }
  },
  production: {
    port: 8080,
    DB: {
      url: process.env.DB_URL
    }
  }
};

module.exports = function() {
  return global.process.env.NODE_ENV === "production"
    ? config.production
    : config.development;
};
