'use strict';

import {createHmac} from 'crypto';

export const getRandomString = (length=64) => {
    let allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomString = '';

    while (length--) {
        randomString += allowed.charAt(~~(Math.random() * allowed.length));
    }

    return randomString;
};

export const encrypt = (plain_text, salt) => {
    return createHmac('sha256', salt)
        .update(plain_text)
        .digest('hex');
};

