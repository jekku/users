'use strict';

import * as UserDao from '../../../dao/UserDao';
import {default as should} from 'should';

export default function () {
    describe('User Data Access Object', () => {
        it(`Should be able to add a new user with unique email and username`, (done) => {

            UserDao.addNewUser({
                username: 'someNewUsername',
                email_address: 'newlyRegisteredEmail@email.net',
                password: 'plainText',
                first_name: 'Some New',
                last_name: 'User'
            }, verifyInsert);

            function verifyInsert (err, result) {
                should.not.exist(err);
                result.affectedRows.should.be.exactly(1);
                done();
            }
        });

        it(`Should be able to query a user by username`, (done) => {
            UserDao.getUserByUsername('someNewUsername', readResults);

            function readResults (err, result) {
                should.not.exist(err);
                result.should.be.type('object');
                done();
            }
        });

        it(`Should be able to query a user by email`, (done) => {
            UserDao.getUserByEmail('newlyRegisteredEmail@email.net', readResults);

            function readResults (err, result) {
                should.not.exist(err);
                result.should.be.type('object');
                done();
            }
        });
    });
};

