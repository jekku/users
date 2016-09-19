'use strict';

import {Router} from 'express';
import * as UserController from '../controller/UserAPI';

function requireSession (req, res, next) {
    if (!req.session.user) {
        res.status(403).send({message: 'Not allowed'});
    }

    return next();
};

export default () => {
    //Alias a reserved word from the router

    const router = Router();

    router.del = router.delete;

    router.get('/', (req, res) => res.render('index'));

    router.post('/api/user/register', UserController.registerUser);
    router.post('/api/user/login',    UserController.login);
    router.post('/api/user/logout',   UserController.logout);

    router.get('/api/user/profile', requireSession, UserController.getUserProfile);

    router.all('*', (req, res) => {
        res.status(404)
          .send({message: 'Nothing to do here'});
    });

    return router;
};

