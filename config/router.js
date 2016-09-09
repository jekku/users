'use strict';

import {Router} from 'express';

export default () => {
    //Alias a reserved word from the router

    const router = Router();

    router.del = router.delete;

    router.all('*', (req, res) => {
        res.status(404)
          .send({message: 'Nothing to do here'});
    });

    return router;
};

