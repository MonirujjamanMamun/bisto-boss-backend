require('dotenv').config();

const allSecret = {
  dev: {
    port: process.env.PORT || 8181,
    jwt_secret: process.env.JWT_SECRET,
  },
  db: {
    mongo_uri: process.env.MONGO_URI,
  },
};

module.exports = { ...allSecret.dev, ...allSecret.db };
