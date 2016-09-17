'use strict';

import {getRandomString, encrypt} from '../helpers/PasswordHelper';
import {v4 as getV4UUID} from 'uuid';

export default class User {
    constructor (fields) {
        Object.assign(this, fields);

        if (!this.id) {
            this.id = getV4UUID();
        }
    }

    buildAuthProtection () {
        if (!this.salt) {
            this.assignSalt();
            this.encryptPassword();
        }
    }

    assignSalt () {
        if (!this.salt) {
            this.salt = getRandomString();
        }
    }

    encryptPassword () {
        if (this.salt) {
            this.password = encrypt(this.password, this.salt);
        }
    }
};

