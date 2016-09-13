'use strict';

import express from 'express';
import {default as config} from './config/config';
import {default as router} from './config/router';
import {urlencoded, json} from 'body-parser';
import compression from 'compression';
import {log} from 'winston';
import {default as mysql} from 'anytv-node-mysql';
import {default as cors} from 'anytv-node-cors';

let app;

const start = () => {
    app = express();

    //Setup environment related details to server
    app.set('env', config.ENV);
    config.use(process.env.NODE_ENV);
    mysql.add('app_db', config.APP_DB, true);
    log('info', `Starting ${config.APP_NAME} on ${config.ENV} environment`);

    // middleware setup for receiving API request payload and headers
    log('info', 'Applying custom middleware');
    app.use(urlencoded({extended: false}));
    app.use(json());
    app.use(compression());
    app.use(cors(config.cors));
    app.use(router());

    //bind server to PORT specified in selected environment
    log('info', `Server listening on port ${config.PORT}`);
    return app.listen(config.PORT);

}

start();

export default app;

