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

        it(`Should not be able to add a new user with existing email`, (done) => {
            UserDao.addNewUser({
                username: 'uniqueNewUserName',
                email_address: 'newlyRegisteredEmail@email.net',
                password: 'plainText',
                first_name: 'Some New',
                last_name: 'User'
            }, verifyInsert);

            function verifyInsert (err, result) {
                should.exist(err);
                done();
            }
        });

        it(`Should not be able to add a new user with existing username`, (done) => {
            UserDao.addNewUser({
                username: 'someNewUsername',
                email_address: 'anotherUniqueEmail@email.neet',
                password: 'plainText',
                first_name: 'Some New',
                last_name: 'User'
            }, verifyInsert);

            function verifyInsert (err, result) {
                should.exist(err);
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

        it(`Should not return non existent username query`, (done) => {
            UserDao.getUserByUsername('this_username_does_not_exist', readResults);

            function readResults (err, result) {
                should.not.exist(err);
                should.not.exist(result);
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

        it(`Should not return non existent email query`, (done) => {
            UserDao.getUserByEmail('nonexistentemail@gmail.com', readResults);

            function readResults (err, result) {
                should.not.exist(err);
                should.not.exist(result);
                done();
            }
        });
    });
};

