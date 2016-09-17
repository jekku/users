'use strict';

import {Router} from 'express';
import * as UserController from '../controller/UserAPI';

export default () => {
    //Alias a reserved word from the router

    const router = Router();

    router.del = router.delete;

    router.post('/api/user/register', UserController.registerUser);
    router.post('/api/user/login', UserController.login);

    router.all('*', (req, res) => {
        res.status(404)
          .send({message: 'Nothing to do here'});
    });

    return router;
};

