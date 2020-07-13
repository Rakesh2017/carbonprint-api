const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,

    API_PASSWORD: process.env.API_PASSWORD,

    PORT: process.env.PORT
  };