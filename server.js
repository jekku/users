'use strict';

import express from 'express';
import {default as session} from 'express-session';
import {default as config} from './config/config';
import {default as router} from './config/router';
import {urlencoded, json} from 'body-parser';
import compression from 'compression';
import {log} from 'winston';
import {default as mysql} from 'anytv-node-mysql';
import {default as cors} from 'anytv-node-cors';
import {default as ejs} from 'ejs-locals';

let handler;
let app;

const start = () => {
    if (handler) {
        handler.close();
    }

    app = express();

    // setup environment related details to server
    app.set('env', config.ENV);
    config.use(process.env.NODE_ENV);
    mysql.add('app_db', config.APP_DB, true);
    log('info', `Starting ${config.APP_NAME} on ${config.ENV} environment`);

    // session store setup
    app.use(session({
        secret: config.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    }));

    //configure frontend proponents
    app.engine('html', ejs);
    app.set('views', config.VIEWS_DIR);
    app.set('view engine', 'html');
    app.use('/bower_components', express.static(config.BOWER_DIR));
    app.use('/assets', express.static(config.DIST_DIR));

    // middleware setup for receiving API request payload and headers
    log('info', 'Applying custom middleware');
    app.use(urlencoded({extended: false}));
    app.use(json());
    app.use(compression());
    app.use(cors(config.cors));
    app.use(router());

    // bind server to PORT specified in selected environment
    log('info', `Server listening on port ${config.PORT}`);
    return app.listen(config.PORT);

}

handler = start();

export default {
  app,
  handler
}

