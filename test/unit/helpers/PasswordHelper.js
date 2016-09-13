'use strict';

import * as PasswordHelper from '../../../helpers/PasswordHelper';

export default function () {
    describe('PasswordHelper', () => {
        it(`Random string generator should return a string of length 64 by default`,
            (done) => {
                const randomString = PasswordHelper.getRandomString();
                randomString.length.should.equal(64);
                done();
            }
        );

        it(`Random string generator should return a string of length N with a parameter`,
            (done) => {
                const randomLength = Math.floor(Math.random() * 100);
                const randomString = PasswordHelper.getRandomString(randomLength);
                randomString.length.should.equal(randomLength);
                done();
            }
        );
    });

    describe('Encryptor', () => {
        it(`Encryptor should make a reliable salted  hash for the string in sha256`,
            (done) => {
                const presetHashed  = '5ad713c4ae3546948fdabf33d4e99ae58fa639280dc9c5e3028d6ed99a08e8d5';
                const arbitrarySalt = '8eWidLg6KWgnNachMtbg9vuetQHiZvR0Y6bVibZ4QvFIpOWo7Wm6fjz69P90xM7t'
                const encryptedString = PasswordHelper.encrypt('user', arbitrarySalt);

                encryptedString.should.equal(presetHashed);

                done();
            }
        );
    });
};

