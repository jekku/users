'use strict';

import {assign} from 'lodash';
import path from 'path';

const config = {
    APP_NAME: 'Users App',

    CORS: {
        allowed_headers: 'Access-Token, X-Requested-With, Content-Type, Accept',
        allowed_origins: '*',
        allowed_methods: 'GET, POST, PUT, OPTIONS, DELETE'
    },

    use: (env) => {
        assign(config, require(__dirname + `/env/${env}`));
        return config;
    }
};

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

export default config.use(process.env.NODE_ENV);

