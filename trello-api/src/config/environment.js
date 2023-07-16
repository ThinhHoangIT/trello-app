// eslint-disable-next-line no-undef
require('dotenv').config();

export const env = {
    // eslint-disable-next-line no-undef
    MONGODB_URI: process.env.MONGODB_URI,
    // eslint-disable-next-line no-undef
    APP_HOST: process.env.APP_HOST,
    // eslint-disable-next-line no-undef
    APP_PORT: process.env.APP_PORT,
    // eslint-disable-next-line no-undef
    DATABASE_NAME: process.env.DATABASE_NAME,
};
