import express from 'express';
import { connectDB } from './config/mongodb';
import { env } from '~/config/environment';
import { apiV1 } from './routes/v1';
import cors from 'cors';
import { corsOptions } from './config/cors';

connectDB()
    .then(() => console.log('Connected success to database'))
    .then(() => bootServer())
    .catch((error) => {
        console.log(error);
        // eslint-disable-next-line no-undef
        process.exit(1);
    });

const bootServer = () => {
    const app = express();

    app.use(cors(corsOptions));

    app.use(express.json());

    app.use('/v1', apiV1);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`${env.APP_HOST}:${env.APP_PORT}`);
    });
};
